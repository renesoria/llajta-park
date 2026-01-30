export interface Parqueo {
  id: string;
  nombre: string;
  direccion: string;
  latitud: number;
  longitud: number;
  precioHora: number;
  capacidadAutos: number;
  capacidadMotos: number;
  ocupadosAutos: number;
  ocupadosMotos: number;
  rating: number;
  imagenUrl?: string;
}
