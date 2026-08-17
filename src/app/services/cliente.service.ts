import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Cuota } from '../enums/cuota.enum';
import { TipoPago } from '../enums/tipoPago.enum';
import { EstadoCliente } from '../enums/estadoCliente.enum';
import { PeriodoPago } from '../enums/periodoPago';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  private clientes: Cliente[] = [
    {
      id: 1,
      nombre: 'AC/DC',
      estado: EstadoCliente.PAGADO,
      periodoPago: PeriodoPago.MES,
      fechaUltimoPago: '2026-07-05',
      cuota: Cuota.INDIVIDUAL,
      monto: 15000,
      tipoPagoHabitual: TipoPago.EFECTIVO,
      celular: '123456'
    },
    {
      id: 2,
      nombre: 'Dana Walker',
      estado: EstadoCliente.PAGADO,
      periodoPago: PeriodoPago.MEDIO_MES,
      fechaUltimoPago: '2026-06-04',
      cuota: Cuota.INDIVIDUAL,
      monto: 15000,
      tipoPagoHabitual: TipoPago.MERCADO_PAGO,
      celular: '451525'
    },
    {
      id: 3,
      nombre: 'Leandro Walker',
      estado: EstadoCliente.PAGADO,
      periodoPago: PeriodoPago.DIA,
      fechaUltimoPago: '2026-07-14',
      cuota: Cuota.FAMILIARx2,
      monto: 1000,
      tipoPagoHabitual: TipoPago.TRANSFERENCIA,
      celular: '898681'
    },
    {
      id: 4,
      nombre: 'Cristina Bovier',
      estado: EstadoCliente.NO_VIENE,
      periodoPago: PeriodoPago.MES,
      fechaUltimoPago: '2026-07-14',
      cuota: Cuota.INDIVIDUAL,
      monto: 4000,
      tipoPagoHabitual: TipoPago.TRANSFERENCIA,
      celular: '157802'
    }
  ];

  constructor() {}

  // =========================================================
  // ESTADO AUTOMÁTICO DE LAS CUOTAS
  // =========================================================

   private actualizarEstados(): void {

    const hoy = new Date();

    hoy.setHours(0, 0, 0, 0);

    this.clientes.forEach(cliente => {

      // Los clientes que no vienen mantienen su estado
      if (cliente.estado === EstadoCliente.NO_VIENE) {
        return;
      }

      // Por ahora solamente automatizamos las cuotas mensuales
      if (cliente.periodoPago !== PeriodoPago.MES) {
        return;
      }

      // Si no tiene fecha de último pago, debe
      if (!cliente.fechaUltimoPago) {
        cliente.estado = EstadoCliente.DEBE;
        return;
      }

      const fechaUltimoPago =
        this.convertirFecha(cliente.fechaUltimoPago);

      const fechaVencimiento =
        this.calcularFechaVencimiento(fechaUltimoPago);

      // Todavía está vigente
      if (hoy <= fechaVencimiento) {

        const diasRestantes =
          this.diferenciaDias(hoy, fechaVencimiento);

        // Últimos 7 días antes del vencimiento
        if (diasRestantes <= 7) {
          cliente.estado = EstadoCliente.POR_VENCER;
        } else {
          cliente.estado = EstadoCliente.PAGADO;
        }

        return;
      }

      // Pasó el día 10
      cliente.estado = EstadoCliente.DEBE;
    });
  }


  // =========================================================
  // FECHA DE VENCIMIENTO
  // =========================================================

  private calcularFechaVencimiento(fechaPago: Date): Date {

    const año = fechaPago.getFullYear();
    const mes = fechaPago.getMonth();

    let vencimiento: Date;

    // Si pagó antes o el día 10,
    // el vencimiento es el día 10 de ese mismo mes.
    if (fechaPago.getDate() <= 10) {

      vencimiento = new Date(
        año,
        mes,
        10
      );

    } else {

      // Si pagó después del día 10,
      // el vencimiento será el día 10 del mes siguiente.
      vencimiento = new Date(
        año,
        mes + 1,
        10
      );
    }

    vencimiento.setHours(0, 0, 0, 0);

    return vencimiento;
  }


  // =========================================================
  // DIFERENCIA ENTRE FECHAS
  // =========================================================

  private diferenciaDias(
    fechaInicio: Date,
    fechaFin: Date
  ): number {

    const diferencia =
      fechaFin.getTime() - fechaInicio.getTime();

    return Math.ceil(
      diferencia / (1000 * 60 * 60 * 24)
    );
  }


  // =========================================================
  // CONVERTIR FECHA
  // =========================================================

  private convertirFecha(fecha: string): Date {

    const partes = fecha.split('-');

    if (partes.length === 3) {

      return new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2])
      );
    }

    return new Date(fecha);
  }


  // =========================================================
  // CLIENTES
  // =========================================================

  public getClientes(): Cliente[]{

    // Actualizamos los estados antes de devolver los clientes
    this.actualizarEstados();

    return [...this.clientes].sort((a, b) => // crea copia del arreglo y ordena esa copia
    a.nombre.localeCompare(b.nombre, 'es', {  // Orden alfabético correcto en español
      sensitivity: 'base'  // ignora los acentos
    })
  );
  }

  // Método que recorre el arreglo de clientes y devuelve el primero que tenga el mismo ID.
  public getClienteById(id: number): Cliente | undefined {
    this.actualizarEstados();
    return this.clientes.find(cliente => cliente.id === id);
  }

  public updateCliente(clienteActualizado: Cliente): void {
    const index = this.clientes.findIndex(cliente => cliente.id === clienteActualizado.id);

    if (index !== -1) {
      this.clientes[index] = { ...clienteActualizado };
    }
  }

  public addCliente(cliente: Cliente): void {
    cliente.id = this.clientes.length + 1;
    this.clientes.push({ ...cliente }); // Así se guarda una copia del objeto
  }

  public deleteCliente(id: number): void {
    this.clientes = this.clientes.filter(cliente => cliente.id !== id);
  }

  public getTotalClientes(): number {
    return this.clientes.length;
  }

  // =========================================================
  // ESTADOS
  // =========================================================
  // Métodos de Estado Cliente
  public getClientesPagados(): number {
    this.actualizarEstados();
    return this.clientes.filter(
      cliente => cliente.estado === EstadoCliente.PAGADO
    ).length;
  }

  public getClientesPorVencer(): number {
    this.actualizarEstados();
    return this.clientes.filter(cliente => cliente.estado === EstadoCliente.POR_VENCER).length;
  }

  public getClientesDeben(): number {
    return this.clientes.filter(
      cliente => cliente.estado === EstadoCliente.DEBE
    ).length;
  }

  public getClientesNoVienen(): number {
    return this.clientes.filter(
      cliente => cliente.estado === EstadoCliente.NO_VIENE
    ).length;
  }

   // =========================================================
  // PERÍODOS DE PAGO
  // =========================================================
  // Métodos de Períodos de Pago
  public getClientesMensuales(): number {
    return this.clientes.filter(
      cliente => cliente.periodoPago === PeriodoPago.MES
    ).length;
  }

  public getClientesMedioMes(): number {
    return this.clientes.filter(
      cliente => cliente.periodoPago === PeriodoPago.MEDIO_MES
    ).length;
  }

  public getClientesSemanales(): number {
    return this.clientes.filter(
      cliente => cliente.periodoPago === PeriodoPago.SEMANA
    ).length;
  }

  public getClientesDiarios(): number {
    return this.clientes.filter(
      cliente => cliente.periodoPago === PeriodoPago.DIA
    ).length;
  }

  // =========================================================
  // RECAUDACIÓN
  // =========================================================
  public getRecaudacionTotal(): number {
    this.actualizarEstados();
    return this.clientes
    .filter(cliente => cliente.estado === EstadoCliente.PAGADO)
    .reduce((total, cliente) => total + Number(cliente.monto), 0); //Number lo comvierte a number
  }
}
