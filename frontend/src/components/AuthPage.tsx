import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import React, { FormEvent, RefObject } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

interface AuthPageProps {
  nameRef?: RefObject<HTMLInputElement | null>;
  emailRef: RefObject<HTMLInputElement | null>;
  passwordRef: RefObject<HTMLInputElement | null>;
  login: boolean;
  onSubmit: (e: FormEvent<Element>) => Promise<void>;
}

const AuthPage = ({
  nameRef,
  emailRef,
  passwordRef,
  login,
  onSubmit,
}: AuthPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-[#262626] flex justify-center items-center">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none dark:bg-white p-4 md:rounded-2xl md:p-8 bg-black">
        <h2 className="text-xl font-bold dark:text-neutral-800 text-neutral-200 text-center">
          {login ? "Welcome back 😎 " : "Welcome to Resume Builder😊"}
        </h2>
        <p className="mt-2 max-w-sm text-sm dark:text-neutral-800 text-neutral-200 text-center">
          {login
            ? "Login to Resume Builder"
            : "Start your journey by Registering"}
        </p>

        <form className="my-8" onSubmit={onSubmit}>
          {login ? null : (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Tyler"
                type="text"
                ref={nameRef}
                autoComplete="name"
              />
            </LabelInputContainer>
          )}

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              ref={emailRef}
              autoComplete="email"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              ref={passwordRef}
              autoComplete="new-password"
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br dark:from-black dark:to-neutral-600 font-medium text-white dark:shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            {login ? "Login" : "Sign up"} &rarr;
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent dark:via-neutral-300 to-transparent via-neutral-700" />

          <div className="flex justify-evenly items-center">
            <button className="group/btn shadow-input relative flex h-10 items-center justify-start space-x-2 rounded-md dark:bg-gray-50 px-4 font-medium text-black bg-zinc-900 shadow-[0px_0px_1px_1px_#262626]">
              <IconBrandGithub className="h-4 w-4 dark:text-neutral-800 text-neutral-300" />
              <span className="text-sm dark:text-neutral-700 text-neutral-300">
                GitHub
              </span>
              <BottomGradient />
            </button>
            <button className="group/btn shadow-input relative flex h-10 items-center justify-start space-x-2 rounded-md dark:bg-gray-50 px-4 font-medium text-black bg-zinc-900 shadow-[0px_0px_1px_1px_#262626]">
              <IconBrandGoogle className="h-4 w-4 dark:text-neutral-800 text-neutral-300" />
              <span className="text-sm dark:text-neutral-700 text-neutral-300">
                Google
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>

        {login ? (
          <div className="text-center text-sm text-gray-50">
            Don&apos;t have an account?{" "}
            <a
              onClick={() => navigate("/register")}
              className="underline underline-offset-4 cursor-pointer"
            >
              Sign up
            </a>
          </div>
        ) : (
          <div className="text-center text-sm text-gray-50">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")}
              className="underline underline-offset-4 cursor-pointer"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default AuthPage;
