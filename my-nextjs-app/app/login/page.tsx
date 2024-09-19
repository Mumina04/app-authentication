"use client";

import Link from "next/link";
import { useState } from "react";
import router from "next/router"; // Import the useRouter hook


export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }
    // Validate password (e.g., minimum 6 characters)
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        router.push("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-white">
      <main className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Please enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 mb-1 border border-black rounded-lg focus:outline-none focus:border-black"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Please enter password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 mb-1 border border-black rounded-lg focus:outline-none focus:border-black"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

            <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Log In
              </button>
          </form>
            <p className="mt-4 text-center text-black">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline" legacyBehavior>
              Sign up
            </Link>
            </p>
            <p className="mt-2 text-center">
              <Link href="/forgot-password" className="text-blue-500 hover:underline" legacyBehavior>
                Forgot Password?
              </Link>
            </p>
            <div className="mt-6 text-center">
          <Link href="/" className="inline-block py-2 px-4 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors" legacyBehavior>
            Go to Home
          </Link>
        </div>
        </main>
      </div>
  );
};

export default Login;
