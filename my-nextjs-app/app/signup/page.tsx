"use client";

import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Handle the signup logic (e.g., send request to Django backend)
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
      <main className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-black text-2xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Please Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border boarder-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black-100"
          />
          <input
            type="password"
            name="password"
            placeholder=" Please enter your Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black-100"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>

        {/* New button to redirect to the home page */}
        <div className="mt-6 text-center">
          <Link href="/" className="inline-block py-2 px-4 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors">
            Go to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
