import { Injectable } from "@angular/core";
import { Pago } from "../models/pago.model";
import { TipoPago } from "../enums/tipoPago.enum";

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private pagos: Pago[] = [
    {
      id: 1,
      clienteId: 2,
      fecha: '2026-06-05',
      monto: 17000,
      tipoPago: TipoPago.EFECTIVO,
      observacion: 'cuota junio'
    },
    {
      id: 4,
      clienteId: 4,
      fecha: '2026-06-03',
      monto: 15000,
      tipoPago: TipoPago.TARJETA_DEBITO,
      observacion: 'cuota junio'
    }
  ];

  constructor() {}

  public getPagos(): Pago[] {
    return [...this.pagos];
  }

  public getPagoById(id: number): Pago | undefined {
    return this.pagos.find(
      pago => pago.id === id
    );
  }

  public addPago(pago: Pago): void {
    pago.id = this.pagos.length + 1;
    this.pagos.push({ ...pago });
  }

  public updatePago(pagoActualizado: Pago): void {
    const index = this.pagos.findIndex(
     pago => pago.id === pagoActualizado.id
    );

    if (index !== -1) {
      this.pagos[index] = { ...pagoActualizado };
    }
  }

  public deletePago(id: number): void {
    this.pagos = this.pagos.filter(p => p.id !== id);
  }

  public getPagosByCliente(clienteId: number): Pago[] {
    return this.pagos.filter(
      pago => pago.clienteId === clienteId
    );
  }

  public getTotalPagadoByCliente(clienteId: number): number {
    const pagosCliente = this.getPagosByCliente(clienteId);
    console.log('💰 Calculando total para:', clienteId);
    console.log('Pagos para calcular total:', pagosCliente);

    return pagosCliente.reduce((total, pago) => total + pago.monto, 0);
  }

  public getCantidadPagosByCliente(clienteId: number): number {
    return this.getPagosByCliente(clienteId).length;
  }

  public getUltimoPago(clienteId: number): Pago | undefined {
    const pagosCliente = this.getPagosByCliente(clienteId);
    return pagosCliente[pagosCliente.length - 1]; //obtiene el último elemento del array
    // en versiones modernas de JavaScript se escribe return pagosCliente.at(-1);
  }

  public getRecaudacionTotal(): number {
    return this.pagos.reduce(
      (total, pago) => total + pago.monto, 0
    );
  }

}
