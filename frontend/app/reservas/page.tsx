'use client';

import Image from 'next/image';
import { Calendar, Clock, Star, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
  const router = useRouter();

  return (
    // FONDO: Usamos un div fijo con la imagen de fondo oscurecida
    <main className="min-h-screen w-full relative bg-slate-900 flex flex-col items-center justify-center p-6">
        
        {/* Imagen de fondo (Simulada, asegúrate de tener una imagen o usar un color sólido oscuro) */}
        <div className="absolute inset-0 z-0 opacity-40">
            {/* Si tienes una imagen de ciudad, ponla aquí en src */}
            <Image 
                src="/fondo-ciudad.jpg" 
                alt="Background" 
                fill 
                className="object-cover"
                priority
            />
        </div>
        
        {/* HEADER SIMPLE (Sobre el fondo) */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
             <div className="relative h-12 w-48 cursor-pointer" onClick={() => router.back()}>
                {/* Reemplaza con tu logo blanco si tienes */}
                 <Image src="/logo.png" alt="Llajta Park" fill className="object-contain object-left" />
             </div>
             {/* Avatar de usuario */}
             <div className="w-10 h-10 rounded-full bg-pink-500 overflow-hidden border-2 border-white">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
             </div>
        </div>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* --- COLUMNA IZQUIERDA --- */}
            <div className="flex flex-col gap-6">
                
                {/* 1. Tarjeta Detalles de la Reserva */}
                <div className="bg-[#f3f4f6] rounded-[20px] p-8 shadow-xl">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Detalles de la Reserva</h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-slate-600 font-medium">
                                <Calendar size={20} />
                                <span>Entrada:</span>
                            </div>
                            <span className="font-bold text-slate-900 border-b border-slate-300 pb-0.5">Hoy a las 12:00</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-slate-600 font-medium">
                                <Calendar size={20} />
                                <span>Salida:</span>
                            </div>
                            <span className="font-bold text-slate-900 border-b border-slate-300 pb-0.5">Hoy a las 15:00</span>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center gap-3 text-slate-600 font-medium">
                                <Clock size={20} />
                                <span>Duración:</span>
                            </div>
                            <span className="font-bold text-slate-900">3 horas</span>
                        </div>
                    </div>
                </div>

                {/* 2. Tarjeta Información de Vehículo */}
                <div className="bg-[#f3f4f6] rounded-[20px] p-8 shadow-xl">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Información de Vehículo</h2>
                    <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                        El número de matrícula de su vehículo se compartirá con el propietario/operador del espacio de estacionamiento.
                    </p>

                    <div className="space-y-4">
                        {/* Select Tipo */}
                        <div className="relative">
                            <select className="w-full bg-white border-none rounded-xl py-3 px-4 text-slate-600 font-medium shadow-sm outline-none focus:ring-2 focus:ring-[#009FE3] appearance-none cursor-pointer">
                                <option>Selecciona el tipo de vehiculo</option>
                                <option value="auto">Automóvil</option>
                                <option value="moto">Motocicleta</option>
                            </select>
                            {/* Flechita custom */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>

                        {/* Input Placa */}
                        <input 
                            type="text" 
                            placeholder="Ingrese su placa" 
                            className="w-full bg-white border-none rounded-xl py-3 px-4 text-slate-800 font-bold placeholder:font-medium placeholder:text-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-[#009FE3]"
                        />
                    </div>
                </div>
            </div>

            {/* --- COLUMNA DERECHA --- */}
            <div className="flex flex-col h-full pt-4">
                
                {/* Contenedor de la Tarjeta del Parqueo */}
                <div className="bg-transparent rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                    
                    {/* Imagen Grande Oscura (Placeholder) */}
                    <div className="h-64 bg-[#1f2937] w-full relative group">
                        {/* Aquí iría la foto real del parqueo */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                           {/* Placeholder visual si no hay imagen */}
                        </div>
                    </div>

                    {/* Barra Blanca con Nombre y Estrellas */}
                    <div className="bg-white p-5 flex items-center justify-between">
                        <span className="text-lg font-bold text-slate-800 underline decoration-slate-300 underline-offset-4">
                            Parqueo España
                        </span>
                        
                        <div className="flex gap-1">
                            {[1,2,3,4,5].map((s) => (
                                <Star key={s} size={18} className="fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                    </div>

                    {/* Botón Azul Grande */}
                    <button className="bg-[#009FE3] hover:bg-[#008ac7] text-white text-lg font-bold py-5 w-full transition-colors active:bg-[#007bb3]">
                        Confirmar Reserva
                    </button>
                </div>

            </div>
        </div>
    </main>
  );
}