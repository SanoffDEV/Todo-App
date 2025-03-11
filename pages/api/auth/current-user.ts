import type { User } from "@prisma/client";

import { getServerSession } from "next-auth";
import { authConfig } from "./[...nextauth]";

export const currentUser = async () => {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    return null;
  }

  const user = session.user as User;

  return user;
};

export const requiredCurrentUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
