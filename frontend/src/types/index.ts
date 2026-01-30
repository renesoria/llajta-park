export interface Parqueo {
  id: string;
  nombre: string;
  direccion: string;
  latitud: number;
  longitud: number;
  capacidadTotal: number;
  ocupadosManual: number;
  precioHora: number;
  imagenUrl?: string;
  esAprobado: boolean;
  duenoId: string;
  descripcion?: string;
  rating?: number;
}