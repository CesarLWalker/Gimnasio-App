import { TipoPago } from "../enums/tipoPago.enum";

export interface Pago {

  id: number;
  clienteId: number;
  fecha: string;
  monto: number;
  tipoPago: TipoPago;
  observacion: string;
}