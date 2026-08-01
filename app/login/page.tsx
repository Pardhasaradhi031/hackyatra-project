"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";
import Link from "next/link";


export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      if (!response.success) {
        setError(response.message);
        return;
      }

      switch (response.user?.role) {
        case "Citizen":
          router.push("/citizen/dashboard");
          break;

        case "Officer":
          router.push("/officer/dashboard");
          break;

        case "Supervisor":
          router.push("/supervisor/dashboard");
          break;

        case "Admin":
          router.push("/admin/dashboard");
          break;

        default:
          router.push("/");
      }

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back!
        </h2>
        <p className="text-center text-sm text-gray-500 mt-1 mb-6">
          Please login to your account
        </p>

        <form className="space-y-5
        "
          onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                👁️
              </button> */}
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>

            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}
          {/* Login Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2.5 text-white font-medium hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
