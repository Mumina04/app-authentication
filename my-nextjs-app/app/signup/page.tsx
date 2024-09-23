"use client";

import React, {SyntheticEvent, useState} from 'react';
import {useRouter} from "next/navigation";
import Link from 'next/link';

const Sign_up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/signup', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        await router.push('/login');
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
      <main className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-black text-2xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black-100"
            placeholder=" Please Enter your Name"
            required
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black-100"
            placeholder="Please Enter your Email"
            required
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black-100"
            placeholder="Please enter your Password"
            required
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </main>
    </div>
    );
    }; 
export default Sign_up;
