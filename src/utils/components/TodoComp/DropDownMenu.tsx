"use server";

import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { LogOut } from "lucide-react";

import { Button } from "@/src/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { Logout } from "@/src/auth/Logout";

export async function DropDownMenu() {
  const session = await getServerSession(authConfig);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-12 h-12 p-0 rounded-full flex items-center justify-center"
        >
          <Avatar className="w-full h-full">
            <AvatarImage
              className="w-full h-full rounded-full object-cover "
              src={session?.user?.image ?? "/placeholder-avatar.png"}
              alt={session?.user?.name ?? "User Avatar"}
            />
            <AvatarFallback className="flex items-center justify-center w-full h-full rounded-full bg-gray-200 text-gray-700">
              {session?.user?.name?.[0] ?? "?"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>User settings</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <LogOut />
            <Logout />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
