import { Type, Static } from "@sinclair/typebox";

import { Role } from "../enums/Role";

export const UserInput = Type.Object({
  id: Type.String(),
  createdAt: Type.Optional(Type.String()),
  email: Type.String(),
  weight: Type.Optional(Type.Number()),
  is18: Type.Optional(Type.Boolean()),
  name: Type.Optional(Type.String()),
  successorId: Type.Optional(Type.Number()),
  role: Type.Optional(Role),
  posts: Type.Array(
    Type.Object({
      id: Type.String(),
      userId: Type.String(),
    })
  ),
  keywords: Type.Array(Type.String()),
  biography: Type.String(),
  decimal: Type.Number(),
  biginteger: Type.Integer(),
});

export type UserInputType = Static<typeof UserInput>;
