'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Parqueo } from '@/types';
import ParkingListSidebar from '@/features/mapa/components/ParkingListSidebar';
import TopFilterBar from '@/features/mapa/components/TopFilterBar';
import ParkingDetailModal from '@/features/mapa/components/ParkingDetailModal';

// Importación dinámica del mapa para evitar errores de servidor
const MapaInteractivo = dynamic(
  () => import('@/features/mapa/components/MapaInteractivo'),
  { 
    ssr: false, 
    loading: () => <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center text-gray-400">Cargando Mapa...</div> 
  }
);

// DATOS DE PRUEBA
const MOCK_PARQUEOS: Parqueo[] = [
    { id: '1', nombre: 'Parqueo España', direccion: 'Calle España #123', latitud: -17.3910, longitud: -66.1550, capacidadTotal: 50, precioHora: 5, autosLibres: 12, motosLibres: 7, rating: 5, descripcion: 'Ubicado en el corazón de la ciudad, este parqueo ofrece seguridad las 24 horas y espacios amplios techados.' },
    { id: '2', nombre: 'Parqueo Baptista', direccion: 'Calle Baptista #456', latitud: -17.3938, longitud: -66.1575, capacidadTotal: 30, precioHora: 7, autosLibres: 5, motosLibres: 15, rating: 4, descripcion: 'Acceso rápido a la plaza principal. Ideal para trámites rápidos en el centro.' },
    { id: '3', nombre: 'Parqueo Colón', direccion: 'Calle Colón #789', latitud: -17.3960, longitud: -66.1520, capacidadTotal: 25, precioHora: 6, autosLibres: 0, motosLibres: 2, rating: 3 },
    { id: '4', nombre: 'Parqueo Galeno', direccion: 'Av. Heroínas', latitud: -17.3890, longitud: -66.1590, capacidadTotal: 40, precioHora: 4, autosLibres: 20, motosLibres: 10, rating: 5 },
    { id: '5', nombre: 'Parqueo 25 de Mayo', direccion: 'Calle 25 de Mayo', latitud: -17.3925, longitud: -66.1500, capacidadTotal: 60, precioHora: 8, autosLibres: 3, motosLibres: 3, rating: 4 },
];

export default function InicioPage() {
  const [parqueos, setParqueos] = useState<Parqueo[]>(MOCK_PARQUEOS);
  const [loading, setLoading] = useState(false);
  const [selectedParking, setSelectedParking] = useState<Parqueo | null>(null);

  return (
    <main className="h-screen w-screen flex flex-col bg-white overflow-hidden relative">
        
        {/* MODAL EMERGENTE (Conecta con /reservas) */}
        {selectedParking && (
            <ParkingDetailModal 
                parqueo={selectedParking} 
                onClose={() => setSelectedParking(null)} 
            />
        )}

        {/* BARRA SUPERIOR AZUL */}
        <TopFilterBar />

        {/* CONTENIDO PRINCIPAL DIVIDIDO */}
        <div className="flex-1 flex overflow-hidden relative">
            
            {/* SIDEBAR IZQUIERDA */}
            <aside className="w-[380px] h-full shadow-xl z-10 flex-shrink-0 relative bg-white">
               <ParkingListSidebar 
                  parqueos={parqueos} 
                  loading={loading}
                  onSelectParking={setSelectedParking} 
               />
            </aside>

            {/* MAPA DERECHA */}
            <section className="flex-1 h-full relative z-0 bg-gray-100">
                <div className="absolute inset-0 w-full h-full">
                    <MapaInteractivo parqueos={parqueos} />
                </div>
            </section>
        </div>
    </main>
  );
}