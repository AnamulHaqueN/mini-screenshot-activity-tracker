"use client";

import { useLogin } from "@/queries/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginInput, loginSchema } from "./schema";
import { ZodError } from "zod";

type FieldErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const { mutateAsync, isPending, isError, error } = useLogin();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);

    try {
      const validatedData: LoginInput = loginSchema.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      await mutateAsync(validatedData);
      router.push("/");
    } catch (err) {
      // need to upgrade
      if (err instanceof ZodError) {
        setFieldErrors(err.message as FieldErrors);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {isError && (
            <div
              role="alert"
              className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded"
            >
              {typeof error === "string"
                ? error
                : "Login failed. Please try again."}
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
              {fieldErrors.email && (
                <p id="email-error" className="text-red-600 text-sm mt-1">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
              {fieldErrors.password && (
                <p id="password-error" className="text-red-600 text-sm mt-1">
                  {fieldErrors.password}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-500"
            >
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
