'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Parqueo } from '@/types';
import L from 'leaflet';
import { useRouter } from 'next/navigation';
import StarRating from './StarRating';
import { Car, Bike } from 'lucide-react';

// Icono personalizado para Leaflet
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapaProps {
  parqueos: Parqueo[];
}

export default function MapaInteractivo({ parqueos }: MapaProps) {
  const router = useRouter();
  // Centro aproximado de Cochabamba
  const centroCochabamba: [number, number] = [-17.3938, -66.1575];

  const handleReserveClick = () => {
    router.push('/reservas');
  };

  return (
    <div className="h-full w-full bg-gray-100 z-0">
      <MapContainer 
        center={centroCochabamba} 
        zoom={15} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false} // Quitamos zoom por defecto para ponerlo en otro lado si quisieramos
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {parqueos.map((parqueo) => (
          <Marker 
            key={parqueo.id} 
            position={[parqueo.latitud, parqueo.longitud]}
            icon={icon}
          >
            <Popup className="font-sans">
              <div className="p-1">
                <h3 className="font-bold text-blue-900">{parqueo.nombre}</h3>
                <StarRating rating={parqueo.rating || 0} />
                <p className="text-xs text-gray-600 my-1">{parqueo.direccion}</p>
                <div className="flex gap-4 my-2">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">AUTOS</span>
                        <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                            <Car size={14} className="text-slate-400"/> {parqueo.capacidadAutos - parqueo.ocupadosAutos}
                        </span>
                    </div>
                    <div className="h-6 w-px bg-gray-200"></div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">MOTOS</span>
                        <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                            <Bike size={14} className="text-slate-400"/> {parqueo.capacidadMotos - parqueo.ocupadosMotos}
                        </span>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded">{parqueo.precioHora} Bs/h</span>
                    <button 
                      onClick={handleReserveClick}
                      className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                        Reservar
                    </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}