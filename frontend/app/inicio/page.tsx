'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Parqueo } from '@/types';
import ParkingListSidebar from '@/features/mapa/components/ParkingListSidebar';
import TopFilterBar from '@/features/mapa/components/TopFilterBar';
import ParkingDetailModal from '@/features/mapa/components/ParkingDetailModal';
import api from '@/lib/axios';

// Importación dinámica del mapa para evitar errores de servidor
const MapaInteractivo = dynamic(
  () => import('@/features/mapa/components/MapaInteractivo'),
  { 
    ssr: false, 
    loading: () => <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center text-gray-400">Cargando Mapa...</div> 
  }
);

export default function InicioPage() {
  const [parqueos, setParqueos] = useState<Parqueo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedParking, setSelectedParking] = useState<Parqueo | null>(null);
  const [filtros, setFiltros] = useState({ autos: false, motos: false });

  useEffect(() => {
    const fetchParqueos = async () => {
      try {
        setLoading(true);
        const response = await api.get<Parqueo[]>('/parqueos');
        setParqueos(response.data);
      } catch (error) {
        console.error('Error al obtener los parqueos:', error);
        // Opcional: manejar el estado de error en la UI
      } finally {
        setLoading(false);
      }
    };

    fetchParqueos();
  }, []);

  const handleFilterChange = (filterType: 'autos' | 'motos') => {
    setFiltros(prev => ({ ...prev, [filterType]: !prev[filterType] }));
  };
  
  const filteredParqueos = parqueos.filter(p => {
    const hasCarSpace = p.capacidadAutos - p.ocupadosAutos > 0;
    const hasMotoSpace = p.capacidadMotos - p.ocupadosMotos > 0;

    if (filtros.autos && filtros.motos) {
      return hasCarSpace && hasMotoSpace;
    }
    if (filtros.autos) {
      return hasCarSpace;
    }
    if (filtros.motos) {
      return hasMotoSpace;
    }
    return true;
  });

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
                  parqueos={filteredParqueos} 
                  loading={loading}
                  onSelectParking={setSelectedParking}
                  filters={filtros}
                  onFilterChange={handleFilterChange}
               />
            </aside>

            {/* MAPA DERECHA */}
            <section className="flex-1 h-full relative z-0 bg-gray-100">
                <div className="absolute inset-0 w-full h-full">
                    <MapaInteractivo parqueos={filteredParqueos} />
                </div>
            </section>
        </div>
    </main>
  );
}