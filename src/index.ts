import { EnvValue, generatorHandler } from '@prisma/generator-helper';
import { transformDMMF } from './generator/transformDMMF';
import * as fs from 'fs';
import * as path from 'path';
import { parseEnvValue } from '@prisma/sdk';
import prettier from 'prettier';

generatorHandler({
  onManifest() {
    return {
      defaultOutput: './typebox',
      prettyName: 'Prisma Typebox Generator',
    };
  },
  async onGenerate(options) {
    const {
      dmmf,
      generator: { output, config },
    } = options;
    const useSubDirs = config.useSubDirs === 'true';

    const payload = transformDMMF(dmmf, useSubDirs);
    if (output) {
      const outputDir =
        // This ensures previous version of prisma are still supported
        typeof output === 'string'
          ? (output as unknown as string)
          : parseEnvValue(output as any);
      try {
        await fs.promises.mkdir(outputDir, {
          recursive: true,
        });
        if (useSubDirs) {
          const types = payload.map(({ type }) => type);
          const uniqueTypes = [...new Set(types)];
          await Promise.all(
            uniqueTypes.map((type) =>
              fs.promises.mkdir(path.join(outputDir, type), {
                recursive: true,
              }),
            ),
          );
        }
        const barrelFile = path.join(outputDir, 'index.ts');
        await fs.promises.writeFile(barrelFile, '', {
          encoding: 'utf-8',
        });
        await Promise.all(
          payload.map((n) => {
            const fsPromises = [];
            fsPromises.push(
              fs.promises.writeFile(
                useSubDirs
                  ? path.join(outputDir, n.type, n.name + '.ts')
                  : path.join(outputDir, n.name + '.ts'),
                prettier.format(n.rawString, {
                  parser: 'babel-ts',
                }),
                {
                  encoding: 'utf-8',
                },
              ),
            );

            fsPromises.push(
              fs.promises.appendFile(
                barrelFile,
                `export * from './${useSubDirs ? `${n.type}/` : ''}${
                  n.name
                }';\n`,
                { encoding: 'utf-8' },
              ),
            );
            if (n.inputRawString) {
              fsPromises.push(
                fs.promises.writeFile(
                  useSubDirs
                    ? path.join(outputDir, n.type, n.name + 'Input.ts')
                    : path.join(outputDir, n.name + 'Input.ts'),
                  prettier.format(n.inputRawString, {
                    parser: 'babel-ts',
                  }),
                  {
                    encoding: 'utf-8',
                  },
                ),
              );
              fsPromises.push(
                fs.promises.appendFile(
                  barrelFile,
                  `export * from './${useSubDirs ? `${n.type}/` : ''}${
                    n.name
                  }Input';\n`,
                  { encoding: 'utf-8' },
                ),
              );
            }

            return Promise.all(fsPromises);
          }),
        );
      } catch (e) {
        console.error(
          'Error: unable to write files for Prisma Typebox Generator',
        );
        throw e;
      }
    } else {
      throw new Error('No output was specified for Prisma Typebox Generator');
    }
  },
});
