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
      fechaPago: '2026-07-05',
      cuota: Cuota.INDIVIDUAL,
      monto: 15000,
      tipoPago: TipoPago.EFECTIVO,
      celular: '123456'
    },
    {
      id: 2,
      nombre: 'Dana Walker',
      estado: EstadoCliente.PAGADO,
      periodoPago: PeriodoPago.MEDIO_MES,
      fechaPago: '2026-06-04',
      cuota: Cuota.INDIVIDUAL,
      monto: 15000,
      tipoPago: TipoPago.MERCADO_PAGO,
      celular: '451525'
    },
    {
      id: 3,
      nombre: 'Leandro Walker',
      estado: EstadoCliente.PAGADO,
      periodoPago: PeriodoPago.DIA,
      fechaPago: '2026-07-14',
      cuota: Cuota.FAMILIARx2,
      monto: 1000,
      tipoPago: TipoPago.TRANSFERENCIA,
      celular: '898681'
    },
    {
      id: 4,
      nombre: 'Cristina Bovier',
      estado: EstadoCliente.NO_VIENE,
      periodoPago: PeriodoPago.MES,
      fechaPago: '2026-07-14',
      cuota: Cuota.INDIVIDUAL,
      monto: 4000,
      tipoPago: TipoPago.TRANSFERENCIA,
      celular: '157802'
    }
  ];

  constructor() {}

  public getClientes(): Cliente[]{
    return [...this.clientes].sort((a, b) => // crea copia del arreglo y ordena esa copia
    a.nombre.localeCompare(b.nombre, 'es', {  // Orden alfabético correcto en español
      sensitivity: 'base'  // ignora los acentos
    })
  );
  }

  // Método que recorre el arreglo de clientes y devuelve el primero que tenga el mismo ID.
  public getClienteById(id: number): Cliente | undefined {
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

  public getClientesPagados(): number {
    return this.clientes.filter(
      cliente => cliente.estado === EstadoCliente.PAGADO
    ).length;
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
}
