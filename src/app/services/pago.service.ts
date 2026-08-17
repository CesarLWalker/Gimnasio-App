import { Injectable } from "@angular/core";
import { Pago } from "../models/pago.model";
import { TipoPago } from "../enums/tipoPago.enum";
import { ClienteService } from "./cliente.service";

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

  constructor(private clienteService: ClienteService) {}

  public getPagos(): Pago[] {
    return [...this.pagos];
  }

  public getPagoById(id: number): Pago | undefined {
    return this.pagos.find(
      pago => pago.id === id
    );
  }

  // =========================================================
  // AGREGAR PAGO
  // =========================================================
  public addPago(pago: Pago): void {
    pago.id = this.pagos.length + 1;
    this.pagos.push({ ...pago });

    // Actualizamos la fecha del último pago del cliente
    this.actualizarFechaUltimoPago(pago.clienteId);
  }

  // =========================================================
  // ACTUALIZAR PAGO
  // =========================================================
  public updatePago(pagoActualizado: Pago): void {

    const pagoAnterior = this.pagos.find(pago => pago.id === pagoActualizado.id);

    const index = this.pagos.findIndex(
     pago => pago.id === pagoActualizado.id
    );

    if (index !== -1) {
      this.pagos[index] = { ...pagoActualizado };

      // Actualizamos el cliente afectado
      this.actualizarFechaUltimoPago(pagoActualizado.clienteId);

      // Si el pago fue cambiado de cliente, también actualizamos al cliente anterior
      if (pagoAnterior && pagoAnterior.clienteId !== pagoActualizado.clienteId) {
        this.actualizarFechaUltimoPago(pagoAnterior.clienteId);
      }
    }
  }

  // =========================================================
  // ELIMINAR PAGO
  // =========================================================
  public deletePago(id: number): void {

    const pago = this.getPagoById(id);

    if (!pago) {
      return;
    }

    this.pagos = this.pagos.filter(p => p.id !== id);

    // Despúes de eliminar, buscamos cuál es ahora el último pago
    this.actualizarFechaUltimoPago(pago.clienteId);
  }

  // =========================================================
  // ACTUALIZAR FECHA DEL ÚLTIMO PAGO DEL CLIENTE
  // =========================================================
  private actualizarFechaUltimoPago(clienteId: number): void {

    const pagosCliente = this.getPagosByCliente(clienteId);

    const cliente = this.clienteService.getClienteById(clienteId);

    if (!cliente) {
      return;
    }

    // Si el cliente ya no tiene pagos
    if (pagosCliente.length === 0) {
      cliente.fechaUltimoPago = '';
      return;
    }

    // Buscamos el pago con la fecha más reciente
    const ultimoPago = pagosCliente.reduce((ultimo, pago) => {
       const fechaUltimo =
          new Date(ultimo.fecha).getTime();

        const fechaPago =
          new Date(pago.fecha).getTime();

        return fechaPago > fechaUltimo ? pago : ultimo;
    });

    cliente.fechaUltimoPago = ultimoPago.fecha;
  }

  // =========================================================
  // PAGOS POR CLIENTE
  // =========================================================
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

    if (pagosCliente.length === 0) {
      return undefined;
    }

    //return pagosCliente[pagosCliente.length - 1]; //obtiene el último elemento del array
    // en versiones modernas de JavaScript se escribe return pagosCliente.at(-1);

    // Buscamos realmente el pago más reciente
    return pagosCliente.reduce((ultimo, pago) => {
      return new Date(pago.fecha).getTime() > new Date(ultimo.fecha).getTime() ? pago : ultimo;
    });
  }

  public getRecaudacionTotal(): number {
    return this.pagos.reduce(
      (total, pago) => total + pago.monto, 0
    );
  }

}
