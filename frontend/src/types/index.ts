export interface Parqueo {
  id: string;
  nombre: string;
  direccion: string;
  latitud: number;
  longitud: number;
  precioHora: number;
  esAprobado: boolean;
  duenoId: string;
  capacidadAutos: number;
  capacidadMotos: number;
  ocupadosAutos: number;
  ocupadosMotos: number;
  descripcion?: string;
  rating?: number;
  imagenUrl?: string;
}