import { SemanaRutina } from "./semanaRutina";

export interface Rutina {
  id?: number;
  nombre: string;
  descripcion?: string;
  activa?: boolean;
  semanas: SemanaRutina[];
}
