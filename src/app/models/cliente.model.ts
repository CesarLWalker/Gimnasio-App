import { Cuota } from "../enums/cuota.enum";
import { EstadoCliente } from "../enums/estadoCliente.enum";
import { PeriodoPago } from "../enums/periodoPago";
import { TipoPago } from "../enums/tipoPago.enum";

export interface Cliente {

  id: number;
  nombre: string;
  estado: EstadoCliente;
  fechaPago: string;
  cuota: Cuota;
  monto: number;
  tipoPago: TipoPago;
  periodoPago: PeriodoPago;
  celular: string;
}
