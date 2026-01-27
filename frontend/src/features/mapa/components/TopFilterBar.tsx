import { User } from 'lucide-react';
import Image from 'next/image';

export default function TopFilterBar() {
  return (
    // CAMBIO AQUÍ: bg-[#009FE3]
    <div className="w-full h-16 bg-[#009FE3] flex items-center justify-between px-6 shadow-md z-50 flex-shrink-0">
      
      {/* IZQUIERDA: LOGO (IMAGEN) */}
      <div className="relative h-10 w-40 cursor-pointer"> 
         <Image 
            src="/logo.png"
            alt="Llajta Park Logo"
            fill
            className="object-contain object-left"
            priority
         />
      </div>

      {/* CENTRO: FECHAS */}
      <div className="hidden md:flex items-center gap-4">
         {/* Input Entrada */}
         <div className="bg-white/90 rounded px-2 py-1 flex items-center">
            <input 
                type="datetime-local" 
                defaultValue="2026-01-25T12:00"
                className="text-sm font-bold text-gray-700 bg-transparent outline-none border-none cursor-pointer"
            />
         </div>
         
         <span className="text-white font-bold">-</span>

         {/* Input Salida */}
         <div className="bg-white/90 rounded px-2 py-1 flex items-center">
            <input 
                type="datetime-local" 
                defaultValue="2026-01-26T12:00"
                className="text-sm font-bold text-gray-700 bg-transparent outline-none border-none cursor-pointer"
            />
         </div>
      </div>

      {/* DERECHA: USUARIO */}
      {/* Ajusté el hover para que combine con el nuevo color */}
      <div className="flex items-center gap-2 text-white cursor-pointer hover:bg-white/10 p-2 rounded transition">
        <div className="bg-white/20 p-1.5 rounded-full">
            <User size={20} className="text-white" />
        </div>
        <span className="font-medium text-sm">user</span>
      </div>

    </div>
  );
}