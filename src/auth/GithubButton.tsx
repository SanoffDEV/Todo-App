"use client";

import Image from "next/image";
import { Button } from "../components/ui/button";
import { signIn } from "next-auth/react";

export function GithubButton() {
  const handleLogin = async () => {
    await signIn("github");
  };

  return (
    <Button
      onClick={handleLogin}
      className="mb-3 flex items-center justify-center w-full gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md py-2"
    >
      <Image
        src="/github.svg"
        alt="githubLogo"
        width={48}
        height={48}
        className="w-6 h-6"
        color="white"
      />
      Login with Github
    </Button>
  );
}
