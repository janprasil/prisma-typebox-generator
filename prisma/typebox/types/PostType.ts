import { Type, Static } from "@sinclair/typebox";

import { Role } from "../enums/Role";

export const PostType = Type.Object({
  title: Type.String(),
  text: Type.String(),
  role: Role,
});

export type PostTypeType = Static<typeof PostType>;
