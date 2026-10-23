import { Cuota } from "../enums/cuota.enum";
import { EstadoCliente } from "../enums/estadoCliente.enum";
import { PeriodoPago } from "../enums/periodoPago";
import { TipoPago } from "../enums/tipoPago.enum";

export interface Cliente {

  id: number;
  nombre: string;
  estado: EstadoCliente;
  fechaUltimoPago: string;
  cuota: Cuota;
  monto: number;
  tipoPagoHabitual: TipoPago;
  periodoPago: PeriodoPago;
  celular: string;
}
