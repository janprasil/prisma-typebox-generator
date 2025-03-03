import { Type, Static } from "@sinclair/typebox";

import { Role } from "../enums/Role";

export const PostInput = Type.Object({
  id: Type.String(),
  user: Type.Optional(
    Type.Object({
      id: Type.String(),
      createdAt: Type.Optional(Type.String()),
      email: Type.String(),
      weight: Type.Optional(Type.Number()),
      is18: Type.Optional(Type.Boolean()),
      name: Type.Optional(Type.String()),
      successorId: Type.Optional(Type.Number()),
      role: Type.Optional(Role),
      keywords: Type.Array(Type.String()),
      biography: Type.String(),
      decimal: Type.Number(),
      biginteger: Type.Integer(),
    })
  ),
  userId: Type.String(),
});

export type PostInputType = Static<typeof PostInput>;
