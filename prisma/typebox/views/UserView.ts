import { Type, Static } from "@sinclair/typebox";

import { Role } from "../enums/Role";
import { PostType } from "../types/PostType";

export const UserView = Type.Object({
  id: Type.String(),
  fullName: Type.String(),
  posts: Type.Array(PostType),
  role: Role,
});

export type UserViewType = Static<typeof UserView>;
