"use client";

import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface UserDropdownProps {}

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Fabio Caldas</DropdownMenuTrigger>
    </DropdownMenu>
  );
}
