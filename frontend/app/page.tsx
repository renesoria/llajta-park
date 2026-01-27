'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/inicio');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <p className="text-gray-600">Redirigiendo...</p>
    </div>
  );
}