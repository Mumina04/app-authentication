// app/page.tsx
'use client'
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-4xl font-bold mb-6 text-gradient">GROUP DELTA</h1>
      <button
        onClick={goToLogin}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Go to Login
      </button>
    </div>
  );
}
