import { Parqueo } from '@/types';
import { X, Star, Car, Bike } from 'lucide-react'; // Importamos Bike

interface Props {
  parqueo: Parqueo;
  onClose: () => void;
}

export default function ParkingDetailModal({ parqueo, onClose }: Props) {
  const rating = parqueo.rating || 5;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-gray-100 rounded-full text-gray-500 hover:text-red-500 transition z-10"
        >
          <X size={20} />
        </button>

        {/* Imagen principal */}
        <div className="h-48 w-full bg-slate-200 relative flex items-center justify-center">
            <div className="flex flex-col items-center text-slate-400">
                <Car size={48} />
                <span className="text-sm font-medium mt-2">Vista del Parqueo</span>
            </div>
        </div>

        <div className="p-6">
            
            {/* Título y Estrellas */}
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-extrabold text-slate-900">{parqueo.nombre}</h2>
                <div className="flex gap-0.5 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < rating ? "currentColor" : "none"} className={i < rating ? "" : "text-gray-300"} />
                    ))}
                </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-6 text-justify">
                {parqueo.descripcion || "Este parqueo ofrece una solución práctica y segura para el estacionamiento de vehículos. Cuenta con espacios amplios, fácil acceso y vigilancia, pensado para brindar comodidad a los conductores."}
            </p>

            {/* DETALLES RÁPIDOS (MODIFICADO) */}
            {/* Quitamos "Zona Central", Agregamos Motos */}
            <div className="flex justify-between gap-2 mb-6 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                
                <div className="flex items-center gap-1">
                    💰 {parqueo.precioHora} Bs/h
                </div>
                
                <div className="h-4 w-px bg-gray-300"></div> {/* Separador visual */}

                <div className="flex items-center gap-1 text-green-700">
                    <Car size={14} /> {parqueo.autosLibres} Autos
                </div>

                <div className="h-4 w-px bg-gray-300"></div> {/* Separador visual */}

                {/* AQUÍ ESTÁ LO NUEVO: MOTOS */}
                <div className="flex items-center gap-1 text-blue-700">
                    <Bike size={14} /> {parqueo.motosLibres} Motos
                </div>
            </div>

            <button className="w-full bg-[#1a4789] text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition shadow-lg hover:shadow-xl active:scale-[0.98]">
                Reservar espacio ahora
            </button>
        </div>
      </div>
    </div>
  );
}