"use client";

import { GithubIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { signIn } from "next-auth/react";

// Remove the `async` keyword from the component itself
export function GithubButton() {
  const handleLogin = async () => {
    await signIn("github");
  };

  return (
    <Button
      onClick={handleLogin} // Call the async function inside the event handler
      className="flex items-center justify-center w-full gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md py-2"
    >
      <GithubIcon className="w-5 h-5" />
      Login with Github
    </Button>
  );
}
