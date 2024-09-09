"use client"
import { NavLinkType } from "@/types";
import React from "react";
import List from "../list";
import NavLink from "../nav-link";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { LogOut, User } from "lucide-react";
import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/modules/auth/authSelectors";
import Logo from "../logo";

export default function Nav() {
  const user = useAppSelector(selectUser);
  const links: NavLinkType[] = [
    { name: "Banks", path: "/banks" },
    { name: "About", path: "/about" },
    { name: "News", path: "/news" },
  ];

  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <header className="bg-white">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <div className="block text-teal-600">
              <span className="sr-only">Home</span>
              <Logo size={50} />
            </div>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <List
                  data={links}
                  renderer={(d) => <NavLink name={d.name} key={d.path} path={d.path} />}
                />
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {!user.data ? (
                  <Link href="/auth/sign-in">
                    <Button>Login</Button>
                  </Link>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>{user.data?.name}</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuGroup>
                        <DropdownMenuItem className="flex items-center p-1">
                          <User className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout} className="flex items-center p-1 text-red-500">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Logout</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
