import { Parqueo } from '@/types';
import { Car, Bike } from 'lucide-react';
import { useRouter } from 'next/navigation';
import StarRating from './StarRating';

interface Props {
  parqueo: Parqueo;
  onSelect: (p: Parqueo) => void;
}

export default function ParkingCard({ parqueo, onSelect }: Props) {
  const router = useRouter();

  const handleReserveClick = () => {
    router.push('/reservas');
  };

  return (
    <div className="bg-white p-3 border-b border-gray-300 flex gap-3 hover:bg-blue-50/30 transition group">
      
      {/* Imagen miniatura */}
      <div className="w-24 h-24 bg-slate-700 rounded-md flex-shrink-0 flex items-center justify-center text-white text-xs text-center p-1">
         <span>Foto</span>
      </div>

      {/* Información */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
            {/* TÍTULO CLICABLE (Este SÍ abre el modal) */}
            <h3 
                onClick={() => onSelect(parqueo)} 
                className="font-bold text-slate-900 text-sm mb-0.5 cursor-pointer hover:text-blue-600 hover:underline decoration-blue-600 underline-offset-2 transition-colors"
            >
                {parqueo.nombre}
            </h3>

            {/* ESTRELLAS EN LA SIDEBAR (Nuevo) */}
            <StarRating rating={parqueo.rating || 0} />
            
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mb-1">
                ESPACIOS DISPONIBLES
            </p>

            {/* Contadores */}
            <div className="flex items-center gap-4 mb-2">
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
        </div>

        {/* Botón Reservar (CON ACCIÓN ONCLICK) */}
        <div className="flex justify-end">
            <button 
                onClick={handleReserveClick}
                className="bg-[#009FE3] text-white text-xs font-bold py-1.5 px-4 rounded hover:bg-[#008ac7] transition shadow-sm cursor-pointer"
            >
                Reservar
            </button>
        </div>
      </div>
    </div>
  );
}