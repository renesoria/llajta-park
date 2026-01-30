import { useState } from 'react';
import { Parqueo } from '@/types';
import ParkingCard from './ParkingCard';
import { Loader2, Car, Filter, Check } from 'lucide-react';

interface Props {
  parqueos: Parqueo[];
  loading: boolean;
  onSelectParking: (p: Parqueo) => void;
  filters: { autos: boolean; motos: boolean };
  onFilterChange: (type: 'autos' | 'motos') => void;
}

export default function ParkingListSidebar({ parqueos, loading, onSelectParking, filters, onFilterChange }: Props) {
  
  const [showFilters, setShowFilters] = useState(false);

  const handleClearFilters = () => {
    if (filters.autos) onFilterChange('autos');
    if (filters.motos) onFilterChange('motos');
  }

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-300 relative">
      
      {/* HEADER DE LA LISTA */}
      <div className="p-4 border-b border-gray-200 shadow-sm bg-white z-20 flex items-center justify-between gap-2">
        
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#009FE3]/10 flex items-center justify-center flex-shrink-0">
                <Car size={18} className="text-[#009FE3]" />
            </div>
            <h2 className="text-sm font-bold text-slate-800 leading-tight">
                Encuentra y selecciona<br/>tu parqueo:
            </h2>
        </div>

        <div className="relative">
            <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition ${showFilters ? 'bg-[#009FE3] text-white' : 'hover:bg-gray-100 text-gray-500'}`}
                title="Filtrar resultados"
            >
                <Filter size={20} />
            </button>

            {showFilters && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
                        Mostrar parqueos con:
                    </h3>
                    
                    <div 
                        onClick={() => onFilterChange('autos')}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer mb-1"
                    >
                        <span className="text-sm font-medium text-slate-700">Espacio para Autos</span>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition ${filters.autos ? 'bg-[#009FE3] border-[#009FE3]' : 'border-gray-300 bg-white'}`}>
                            {filters.autos && <Check size={14} className="text-white" strokeWidth={3} />}
                        </div>
                    </div>

                    <div 
                        onClick={() => onFilterChange('motos')}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                        <span className="text-sm font-medium text-slate-700">Espacio para Motos</span>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition ${filters.motos ? 'bg-[#009FE3] border-[#009FE3]' : 'border-gray-300 bg-white'}`}>
                            {filters.motos && <Check size={14} className="text-white" strokeWidth={3} />}
                        </div>
                    </div>
                    
                    {(filters.autos || filters.motos) && (
                        <div 
                            onClick={handleClearFilters}
                            className="mt-2 pt-2 border-t border-gray-100 text-center text-xs text-[#009FE3] font-bold cursor-pointer hover:underline"
                        >
                            Limpiar filtros
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>

      {/* LISTA DE TARJETAS */}
      <div className="flex-1 overflow-y-auto bg-[#f8f9fa] scrollbar-thin">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-40 gap-2 text-gray-400">
            <Loader2 className="animate-spin" />
            <span className="text-xs">Cargando...</span>
          </div>
        ) : parqueos.length > 0 ? (
          parqueos.map(p => (
            <ParkingCard 
                key={p.id} 
                parqueo={p} 
                onSelect={onSelectParking}
            />
          ))
        ) : (
            <div className="p-8 text-center text-gray-500">
                <p className="text-sm font-medium">No hay resultados</p>
                <p className="text-xs mt-1">Intenta desactivar los filtros.</p>
            </div>
        )}
        
        <div className="h-10"></div>
      </div>
    </div>
  );
}