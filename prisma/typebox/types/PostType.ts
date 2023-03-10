import { Type } from "@sinclair/typebox";

export const PostType = Type.Object({
  title: Type.String(),
  text: Type.String(),
});
