import React from "react";
import { AvatarFallback, Avatar as CNAvatar, AvatarImage } from "./ui/avatar";

export default function Avatar({src, fallback = ""}: {src?: string, fallback?: string}) {
    let [fname, lname] = fallback?.split(" ")
    let name = (fname ? fname.charAt(0) : "") + (lname ? lname.charAt(0) : "");
  return (
    <CNAvatar>
      <AvatarImage src={src} />
      {name && <AvatarFallback  className="uppercase bg-primary text-white">{name}</AvatarFallback>}
    </CNAvatar>
  );
}
