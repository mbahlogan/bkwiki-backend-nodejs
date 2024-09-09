"use client"
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SuccessInfo() {
  return (
    <div className="bg-slate-50 h-screen">
      <div className="h-full flex justify-center  items-center ">
        <div className="bg-white lg:max-w-[60rem] max-w-[30rem] lg:w-3/12  p-10 m-6 rounded-lg">
          <div className="grid grid-cols-1 gap-3 pt-6">
            <div className="col-span-1">
              <div className="flex justify-center items-center pt-4 mb-6">
                <Link href="#" aria-label="theme-logo">
                  <Image width={50} height={50} src="/logo.png" alt="" />
                </Link>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Typography variant="title" size="md">
                  Account Created
                </Typography>
                <Typography className=" mt-2 text-center">
                Your account has been created successfully! You can now log in using your username and password
                </Typography>
              </div>
              <div className="mt-8">
                <Link href="/auth/sign-in">
                <Button className="w-full">Login Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
