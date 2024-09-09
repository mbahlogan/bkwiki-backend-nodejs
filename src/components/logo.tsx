import Link from "next/link";
import React from "react";

export default function Logo({ size = 60 }: { size?: number }) {
  return (
    <Link href="/">
      <img width={size} src="/logo.png" alt="" />
    </Link>
  );
}
