import { Type, Static } from "@sinclair/typebox";

import { PostType } from "../types/PostType";

export const UserView = Type.Object({
  id: Type.String(),
  fullName: Type.String(),
  posts: Type.Array(PostType),
});

export type UserViewType = Static<typeof UserView>;
