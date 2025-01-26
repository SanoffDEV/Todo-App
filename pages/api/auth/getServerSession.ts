import { getServerSession } from "next-auth";
import { authConfig } from "@/pages/api/auth/[...nextauth]";

export async function getUserSession() {
  const session = await getServerSession(authConfig);
}

export const session = getServerSession(authConfig);
