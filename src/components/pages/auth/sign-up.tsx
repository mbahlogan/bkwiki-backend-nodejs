"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import AuthLayout from "./layout";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/modules/auth/authSelectors";
import { UserState } from "@/redux/modules/auth/authReducer";
import authActions from "@/redux/modules/auth/authActions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const validationSchema = z.object({
  email: z.string().email(),
  pwd: z.string().min(4, "Password should contain at least 4 characters"),
  confirmPwd: z.string(),
  fname: z.string(),
  lname: z.string(),
  phone: z.string(),
  agreeToTerms: z.boolean(),
});

const initialValues = {
  email: "",
  pwd: "",
  confirmPwd: "",
  fname: "",
  lname: "",
  phone: "",
  agreeToTerms: false,
};

type FormData = z.infer<typeof validationSchema>;

export default function SignUp() {
  const user: typeof UserState.user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const form = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: initialValues,
  });

  const { setError, clearErrors, watch } = form;
  const pwd = watch("pwd");
  const confirmPwd = watch("confirmPwd");

  useEffect(() => {
    if (pwd !== confirmPwd) {
      setError("confirmPwd", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      clearErrors("confirmPwd");
    }
  }, [pwd, confirmPwd, setError, clearErrors]);

  function onSubmit(user: FormData) {
    const { agreeToTerms, confirmPwd, ...body } = user;

    dispatch(authActions.signInUser(body));
  }

  return (
    <AuthLayout>
      <Form {...form}>
        {user.error && (
          <Alert variant="destructive" className="bg-red-50 mt-4">
            <AlertTitle>Incorrect credentials</AlertTitle>
            <AlertDescription>
              Please enter your correct credentials to login
            </AlertDescription>
          </Alert>
        )}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-6 gap-4"
        >
          <div className="col-span-6 sm:col-span-3">
            <FormField
              control={form.control}
              name="fname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <FormField
              control={form.control}
              name="lname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <FormField
              control={form.control}
              name="pwd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <FormField
              control={form.control}
              name="confirmPwd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-4">
                    <FormControl>
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm text-gray-700">
                      I want to receive emails about events, product updates and
                      company announcements.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our{" "}
              <Link href="#" className="text-gray-700 underline">
                terms and conditions{" "}
              </Link>
              and{" "}
              <a href="#" className="text-gray-700 underline">
                privacy policy
              </a>
              .
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <Button loading={user.loading}>Create an account</Button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <Button variant="link" href="/auth/sign-in">
                Log in.
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
