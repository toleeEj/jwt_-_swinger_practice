"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access");
    const storedUsername = localStorage.getItem("username");
    if (!token) {
      router.push("/login");
    } else {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    router.push("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push("/todos")}>
        Todo App
      </h1>
      <div className="flex items-center gap-4">
        {username && <span className="font-medium">Hi, {username}</span>}
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
