import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirige automáticamente de localhost:xxxx/ a localhost:xxxx/inicio
  redirect('/inicio');
}