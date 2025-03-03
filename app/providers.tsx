"use client";

import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export type ProviderProps = PropsWithChildren;

export const Providers = (props: ProviderProps) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </SessionProvider>
  );
};
