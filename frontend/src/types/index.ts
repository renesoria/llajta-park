export interface Parqueo {
  id: string;
  nombre: string;
  direccion: string;
  latitud: number;
  longitud: number;
  capacidadTotal: number;
  precioHora: number;
  autosLibres: number;
  motosLibres: number;
  imagenUrl?: string;
  // CAMPOS NUEVOS PARA EL MODAL
  descripcion?: string;
  rating?: number; // De 1 a 5
}