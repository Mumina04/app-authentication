"use client";

import React, { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
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
      // Navigate to the dashboard after a successful login
      await router.push('/dashboard');
    } else {
      // Handle login error here (e.g., show error message)
      console.error('Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-white">
      <main className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Login</h1>

        <form onSubmit={submit}>
          <div className="form-group">
            <input 
              type="email" 
              className="w-full p-3 mb-1 border border-black rounded-lg focus:outline-none focus:border-black bg-white text-black" 
              placeholder="Please enter your email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <input 
              type="password" 
              className="w-full p-3 mb-1 border border-black rounded-lg focus:outline-none focus:border-black bg-white text-black" 
              placeholder="Please enter password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-black">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
        <p className="mt-2 text-center">
          <Link href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </p>
        <div className="mt-6 text-center">
          <Link href="/" className="inline-block py-2 px-4 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors">
            Go to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
