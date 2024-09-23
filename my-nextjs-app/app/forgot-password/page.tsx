"use client";

import React, { SyntheticEvent, useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/forgot-password', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email
      })
    });

    if (response.ok) {
      setMessage("Password reset link has been sent to your email.");
      setTimeout(() => {
        router.push('/login');
      }, 3000);  // Redirect to login after 3 seconds
    } else {
      setMessage("Failed to send reset link. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <main className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-black text-2xl font-bold text-center mb-6">Forgot Password</h1>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            required
            onChange={e => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mt-4"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </main>
    </div>
  );
};

export default ForgotPassword;
