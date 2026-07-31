"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";


export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Login to continue
        </p>

        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              {/* <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                👁️
              </button> */}
            </div>
          </div>

          {error && (
            <div className="rounded bg-red-100 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            disabled={loading}
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Register here
          </a>
        </p>

      </div>
    </div>
  );
}