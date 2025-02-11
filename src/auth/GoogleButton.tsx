"use client";

import { Button } from "../components/ui/button";
import { signIn } from "next-auth/react";

export function GoogleButton() {
  const handleLogin = async () => {
    await signIn("google");
  };

  return (
    <Button
      onClick={handleLogin}
      className="mb-3 flex items-center justify-center w-full gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md py-2"
    >
      <img src="/google.svg" alt="google" className="w-6 h-6" />
      Login with Google
    </Button>
  );
}
