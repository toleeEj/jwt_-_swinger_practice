"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("auth/login/", form);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("username", form.username); // save username
      router.push("/todos");
    } catch (error: any) {
      if (error.response) setMessage("Invalid credentials. Please try again.");
      else if (error.request) setMessage("No response from server. Please try again later.");
      else setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-8 tracking-tight">
          Sign In
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-sm space-y-6"
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-gray-700 placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-gray-700 placeholder-gray-400"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            Sign In
          </button>
          {message && (
            <p className="text-center text-sm text-red-600 bg-red-50 py-2 rounded-lg">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}