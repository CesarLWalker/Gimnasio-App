import { EjercicioRutina } from "./ejercicioRutina.model";

export interface Rutina {
  id?: number;
  nombre: string;
  descripcion?: string;
  diasEntrenamiento: string [];
  diasPorSemana: number;
  ejercicios: EjercicioRutina[];
}
