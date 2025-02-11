"use client";

import { signOut } from "next-auth/react";

export function Logout() {
  return (
    <span
      onClick={async () => {
        await signOut();
      }}
    >
      Logout
    </span>
  );
}
