"use client";

import React from 'react';
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <main className="w-full max-w-4xl p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-black">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="p-6 bg-blue-500 text-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Welcome to Your Dashboard</h2>
            <p>Here you can view your profile, manage settings, and more.</p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-green-500 text-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Recent Activity</h2>
            <p>Check out your recent activities and updates here.</p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-purple-500 text-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Manage Your Account</h2>
            <p>Update your account details, change your password, and more.</p>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-red-500 text-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Support</h2>
            <p>Need help? Reach out to our support team anytime.</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="inline-block py-2 px-4 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors">
            Go Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
