'use client';

import Image from 'next/image';
import { Calendar, Clock, Star, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ReservasPage() {
  const router = useRouter();

  return (
    // FONDO: Usamos un div fijo con la imagen de fondo oscurecida
    <main className="min-h-screen w-full relative bg-slate-900 flex flex-col items-center justify-center p-6">

        {/* Imagen de fondo (Simulada, asegúrate de tener una imagen o usar un color sólido oscuro) */}
        {/* IMAGEN DE FONDO */}
        <div className="absolute inset-0 z-0 opacity-40">
            {/* Si tienes una imagen de ciudad, ponla aquí en src */}
            <Image 
                src="/fondo-ciudad.jpg" 
                alt="Background" 
                fill 
                className="object-cover"
                priority
            />
            {/* Si no tienes la imagen fondo-ciudad.jpg, esto mostrará un fondo oscuro elegante */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"></div>
            {/* Descomenta la siguiente línea si ya pusiste la imagen en public/ */}
            {/* <Image src="/fondo-ciudad.jpg" alt="Fondo" fill className="object-cover" /> */}
        </div>

        {/* HEADER: NAVEGACIÓN */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
             
             {/* BOTÓN ATRÁS (Regresa a /inicio) */}
             <div className="flex items-center gap-4 cursor-pointer group" onClick={() => router.push('/inicio')}>
                <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition backdrop-blur-sm border border-white/10">
                    <ArrowLeft className="text-white" />
                </div>
                {/* Logo */}
                <div className="relative h-10 w-32">
                    <Image src="/logo.png" alt="Llajta Park" fill className="object-contain object-left" priority />
                </div>
             </div>
             
             {/* Avatar Usuario */}
             <div className="w-10 h-10 rounded-full bg-pink-500 overflow-hidden border-2 border-white/50 shadow-lg">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
             </div>
        </div>

        {/* CONTENEDOR CENTRAL */}
        <div className="relative z-10 w-full max_width-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-in fade-in zoom-in-95 duration-500">
            
            {/* --- COLUMNA IZQUIERDA (Formularios) --- */}
            <div className="flex flex-col gap-6">
                
                {/* Tarjeta 1: Detalles */}
                <div className="bg-[#f3f4f6] rounded-[20px] p-8 shadow-2xl border border-white/50">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Detalles de la Reserva</h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-[#009FE3] text-white rounded-lg shadow-sm">
                            <div className="flex items-center gap-3 font-medium">
                                <Calendar size={20} />
                                <span>Entrada: Hoy a las 12:00</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-[#009FE3] text-white rounded-lg shadow-sm">
                            <div className="flex items-center gap-3 font-medium">
                                <Calendar size={20} className="text-orange-500"/>
                                <span>Salida: Hoy a las 15:00</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-3 text-slate-600 font-medium">
                                <Clock size={20} />
                                <span>Duración:</span>
                            </div>
                            <span className="font-bold text-slate-900 text-lg">3 horas</span>
                        </div>
                    </div>
                </div>

                {/* Tarjeta 2: Vehículo */}
                <div className="bg-[#f3f4f6] rounded-[20px] p-8 shadow-2xl border border-white/50">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Información de Vehículo</h2>
                    <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                        El número de matrícula se compartirá con el propietario del parqueo para autorizar su ingreso.
                    </p>

                    <div className="space-y-4">
                        {/* Select */}
                        <div className="relative">
                            <select className="w-full bg-white border-none rounded-xl py-3 px-4 text-slate-600 font-medium shadow-sm outline-none focus:ring-2 focus:ring-[#009FE3] appearance-none cursor-pointer transition-all">
                                <option>Selecciona el tipo de vehiculo</option>
                                <option value="auto">Automóvil</option>
                                <option value="moto">Motocicleta</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                ▼
                            </div>
                        </div>

                        {/* Input */}
                        <input 
                            type="text" 
                            placeholder="Ingrese su placa (Ej: 1234-ABC)" 
                            className="w-full bg-white border-none rounded-xl py-3 px-4 text-slate-800 font-bold placeholder:font-medium placeholder:text-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-[#009FE3] transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* --- COLUMNA DERECHA (Resumen y Acción) --- */}
            <div className="flex flex-col h-full pt-4">
                
                <div className="bg-transparent rounded-3xl overflow-hidden shadow-2xl flex flex-col ring-1 ring-white/20">
                    
                    {/* Imagen Grande (Placeholder oscuro) */}
                    <div className="h-64 bg-slate-800 w-full relative group">
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                           <span className="text-white font-bold">Foto del Parqueo</span>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="bg-white p-6 flex items-center justify-between border-b border-gray-100">
                        <div>
                            <span className="text-lg font-bold text-slate-800 underline decoration-[#009FE3] decoration-2 underline-offset-4">
                                Parqueo España
                            </span>
                            <p className="text-xs text-slate-500 mt-1">Calle España #123</p>
                        </div>
                        
                        <div className="flex gap-1">
                            {[1,2,3,4,5].map((s) => (
                                <Star key={s} size={18} className="fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                    </div>

                    {/* Botón Acción */}
                    <button className="bg-[#009FE3] hover:bg-[#008ac7] text-white text-xl font-bold py-6 w-full transition-all active:bg-[#007bb3] flex items-center justify-center gap-2 group">
                        Confirmar Reserva
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>

            </div>
        </div>
    </main>
  );
}
