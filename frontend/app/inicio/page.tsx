'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Parqueo } from '../../src/types';

// Importa los componentes de la barra lateral y filtros
import ParkingListSidebar from '../../src/features/mapa/components/ParkingListSidebar';
import TopFilterBar from '../../src/features/mapa/components/TopFilterBar';
import ParkingDetailModal from '../../src/features/mapa/components/ParkingDetailModal';

// Carga dinámica del mapa para evitar problemas con SSR
const MapaInteractivo = dynamic(() => import('../../src/features/mapa/components/MapaInteractivo'), {
  ssr: false,
});

// Mock de datos de parqueos (simulando una llamada a la API)
const mockParqueos: Parqueo[] = [
  {
    id: '1',
    nombre: 'Parqueo Central',
    direccion: 'Calle Sucre, Cochabamba',
    latitud: -17.3938,
    longitud: -66.1575,
    capacidadTotal: 50,
    precioHora: 10,
    autosLibres: 20,
    motosLibres: 5,
    rating: 4,
    descripcion: 'Parqueo subterráneo en el corazón de la ciudad.',
    imagenUrl: '/parqueo1.jpg'
  },
  {
    id: '2',
    nombre: 'Estacionamiento Norte',
    direccion: 'Avenida Pando, Cochabamba',
    latitud: -17.383,
    longitud: -66.155,
    capacidadTotal: 30,
    precioHora: 8,
    autosLibres: 10,
    motosLibres: 10,
    rating: 3,
    descripcion: 'Cerca de la zona comercial, ideal para compras rápidas.',
    imagenUrl: '/parqueo2.jpg'
  },
];


export default function InicioPage() {
  const [selectedParqueo, setSelectedParqueo] = useState<Parqueo | null>(null);

  const handleSelectParqueo = (parqueo: Parqueo) => {
    setSelectedParqueo(parqueo);
  };

  const handleCloseModal = () => {
    setSelectedParqueo(null);
  };

  return (
    <main className="flex h-screen w-full font-sans">
      {/* Barra lateral con la lista de parqueos */}
      <ParkingListSidebar 
        parqueos={mockParqueos}
        onSelectParqueo={handleSelectParqueo}
      />
      
      <div className="flex-1 flex flex-col relative">
        {/* Barra de filtros superior */}
        <TopFilterBar />

        {/* El mapa ocupa el resto del espacio */}
        <div className="flex-1">
          <MapaInteractivo parqueos={mockParqueos} />
        </div>
      </div>
      
      {/* Modal de detalle del parqueo */}
      {selectedParqueo && (
        <ParkingDetailModal
          parqueo={selectedParqueo}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}