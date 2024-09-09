"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import Image from "next/image";
import { getLocalUser } from "@/helpers/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import authActions from "@/redux/modules/auth/authActions";
import { Typography } from "@/components/ui/typography";
import {
  selectUser,
} from "@/redux/modules/auth/authSelectors";
import { UserState } from "@/redux/modules/auth/authReducer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type userType = {
  id: string;
  email: string;
};

type FormData = z.infer<typeof FormSchema>;

export default function Verify() {
  const dispatch = useAppDispatch();
  const state: typeof UserState.user = useAppSelector(selectUser);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const user: userType = getLocalUser();

  function onSubmit(otp: FormData) {
    const body = { ...otp, id: user.id };
    dispatch(authActions.verifyUser(body));
  }

  const pins = new Array(6).fill(null).map((_, index) => index);

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
                  Enter Verification Code
                </Typography>
                <Typography className=" mt-2">We send you on mail.</Typography>

                <Typography
                  variant="paragraph"
                  size="sm"
                  className="font-normal mb-4 text-[#697586] mt-2"
                >
                  We’ve send you code on
                  {/* We’ve send you code on { maskEmail(user.email)} */}
                </Typography>
              </div>
              <div>
                {state.error && (
                  <Alert variant="destructive" className="bg-red-50 mb-4">
                    <AlertTitle>Incorrect Code</AlertTitle>
                    <AlertDescription>
                      Please enter your correct code to verify your account
                    </AlertDescription>
                  </Alert>
                )}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="w-full flex justify-center">
                      <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <InputOTP maxLength={6} {...field}>
                                {pins.map((item) => (
                                  <InputOTPGroup key={item}>
                                    <InputOTPSlot index={item} />
                                  </InputOTPGroup>
                                ))}
                              </InputOTP>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="w-full mt-6 py-5" loading={state.loading}>
                      Continue
                    </Button>
                  </form>
                </Form>
                <div className="flex items-center gap-x-3 pt-6 pb-4 border-b">
                  <Typography className="font-normal">
                    Did not receive the email? Check your spam filter, or
                  </Typography>

                  <Button variant="ghost">Resend code</Button>
                </div>
                <div className="pt-5">
                  <Typography className="pb-4 text-center">
                    Did not receive the email? Check your spam filter, or
                  </Typography>
                  <Button variant="outline" className="w-full">
                    Resend Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
