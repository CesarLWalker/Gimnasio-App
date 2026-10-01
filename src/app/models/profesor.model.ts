import { EstadoProfesor } from "../enums/estadoProfesor.enum";
import { TipoRemuneracion } from "../enums/tipoRemuneracion.enum";

export interface Profesor {

  id: number;
  icono: string;
  nombre: string;
  celular: string;
  especialidad: string;
  sueldo: number;
  valorHora: number;
  tipoRemuneracion: TipoRemuneracion;
  estado: EstadoProfesor;
  color: string;
}
