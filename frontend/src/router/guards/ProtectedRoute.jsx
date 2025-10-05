'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useAuth } from '@/lib/auth'; 

export default function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
  const router = useRouter();
    const user = null; // Replace with actual user state
    const loading = false; // Replace with actual loading state
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) return <p>Loading...</p>;
  return user ? children : null;
}
