import Logo from "@/components/logo";
import React from "react";

export default function AuthLayout({ children }: { children: any }) {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/assets/login-auth-bg.jpeg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <div className="block text-white">
              <span className="sr-only">Home</span>
              <img width={50} src="/logo.png" alt="" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to BKWIKI
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Are you navigating the Cameroonian banking landscape? We
              understand it can be overwhelming. BKWIKI is here to simplify your
              search for banking information. Our user-friendly platform
              provides comprehensive details on a variety of banking products
              and services offered by different institutions in Cameroon.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-md w-full">
            <div className="relative -mt-16 block">
              <div className="inline-flex items-center justify-center">
                <span className="sr-only">Home</span>
                <Logo />
              </div>
              <div className="space-t-2">
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to BKWIKI
              </h1>

              <p className="leading-relaxed text-gray-500">
                Your One-Stop Shop for Banking Information in Cameroon
              </p>
              </div>
            </div>

            {children}
          </div>
        </main>
      </div>
    </section>
  );
}
