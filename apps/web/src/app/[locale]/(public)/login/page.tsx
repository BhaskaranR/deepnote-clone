import { Logo } from "@/components/logo";
import { OTPSignIn } from "@/components/otp-sign-in";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | Deepnote Clone",
};

export default async function Page() {

  const preferredSignInOption = (
    <OTPSignIn
      className="border-t-[1px] border-border pt-8"
    />
  );

  return (
    <div>
      <header className="w-full fixed left-0 right-0">
        <div className="ml-5 mt-4 md:ml-10 md:mt-10">
          <Link
            href="https://deepnote-clone.com"
            className="inline-flex items-center"
          >
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
      </header>

      <div className="flex min-h-screen justify-center items-center overflow-hidden p-6 md:p-0">
        <div className="relative z-20 m-auto flex w-full max-w-[380px] flex-col py-8">
          <div className="flex w-full flex-col relative">
            <div className="pb-4 bg-gradient-to-r from-primary dark:via-primary dark:to-[#848484] to-[#000] inline-block text-transparent bg-clip-text">
              <h1 className="font-medium pb-1 text-3xl">Login to Deepnote Clone.</h1>
            </div>


            <div className="pointer-events-auto mt-6 flex flex-col mb-6">
              {preferredSignInOption}
            </div>

            <p className="text-xs text-[#878787]">
              By clicking continue, you acknowledge that you have read and agree
              to Deepnote Clone's{" "}
              <a href="https://deepnote-clone.com/terms" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="https://deepnote-clone.com/privacy" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
