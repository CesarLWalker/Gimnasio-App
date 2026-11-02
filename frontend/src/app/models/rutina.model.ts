import { EjercicioRutina } from "./ejercicioRutina.model";

export interface Rutina {
  id?: number;
  nombre: string;
  descripcion?: string;
  series: number;
  repeticiones: string;
  diasEntrenamiento: string [];
  diasPorSemana: number;
  ejercicios: EjercicioRutina[];
}
