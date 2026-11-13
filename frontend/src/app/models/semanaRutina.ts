import { DiaRutina } from "./diaRutina";

export interface SemanaRutina {
  id?: number;
  numeroSemana: number;
  dias: DiaRutina[];
}
