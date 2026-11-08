import { EjercicioRutina } from "./ejercicioRutina.model";

export interface DiaRutina {
    id?: number;
    numeroDia: number;
    nombre: string;
    grupoMuscular: string;
    ejercicios: EjercicioRutina[];
}
