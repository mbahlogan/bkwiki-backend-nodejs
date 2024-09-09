import { NavLinkType } from "@/types";
import Link from "next/link";
import React from "react";

export default function NavLink({ name, path }: NavLinkType) {
  return (
    <Link href={path}>
      <li className="text-black font-medium transition hover:text-gray-500/75">
        {name}
      </li>
    </Link>
  );
}
