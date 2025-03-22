import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/ui/card";
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { GithubButton } from "@/src/auth/GithubButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GoogleButton } from "@/src/auth/GoogleButton";

export default async function LoginCard() {
  const session = await getServerSession(authConfig);

  if (session) {
    redirect("/");
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 ">
      <Card className="w-96 shadow-lg border border-gray-200 bg-white">
        <CardTitle className="text-center text-xl font-bold mt-4">
          Login
        </CardTitle>
        <CardContent className="p-6">
          <CardDescription className="text-center text-gray-600 mb-6">
            Please login with your Github account
          </CardDescription>
          <GithubButton />
          <GoogleButton />
        </CardContent>
      </Card>
    </div>
  );
}
