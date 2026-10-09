import { EstadoLiquidacion } from "../enums/estadoLiquidacion.enum";
import { TipoRemuneracion } from "../enums/tipoRemuneracion.enum";

export interface LiquidacionProfesor {

  id: number;
  profesorId: number;
  periodo: string;
  totalHoras: number;
  valorHora: number;
  tipoRemuneracion: TipoRemuneracion;
  totalPagar: number;
  estado: EstadoLiquidacion;
  fechaLiquidacion?: string;
}