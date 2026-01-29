import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/fondo-cbba.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </main>
  );
}
