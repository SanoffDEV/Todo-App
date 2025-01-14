import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { LoginButton } from "@/src/auth/LoginButton";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authConfig);
  return (
    <div>
      <LoginButton />
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}
