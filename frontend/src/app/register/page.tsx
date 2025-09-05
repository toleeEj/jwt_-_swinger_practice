"use client";
import { useState } from "react";
import API from "@/lib/api";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }
    try {
      await API.post("auth/register/", form);
      setMessage("Registration successful! You can now sign in.");
      setForm({
        username: "",
        email: "",
        password: "",
        password2: "",
        first_name: "",
        last_name: "",
      });
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response.data;
        setMessage(
          typeof errorData === "string"
            ? errorData
            : Object.values(errorData).flat().join(" ") || "Registration failed. Please try again."
        );
      } else if (error.request) {
        setMessage("No response from server. Please try again later.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-8 tracking-tight">
          Create Your Account
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-gray-700 placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="first_name"
                type="text"
                placeholder="Enter your first name"
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-gray-700 placeholder-gray-400"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="last_name"
                type="text"
                placeholder="Enter your last name"
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-gray-700 placeholder-gray-400"
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
            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="password2"
                type="password"
                placeholder="Confirm your password"
                value={form.password2}
                onChange={(e) => setForm({ ...form, password2: e.target.value })}
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-gray-700 placeholder-gray-400"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            Create Account
          </button>
          {message && (
            <p
              className={`text-center text-sm py-2 rounded-lg ${
                message.includes("successful")
                  ? "text-green-600 bg-green-50"
                  : "text-red-600 bg-red-50"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}