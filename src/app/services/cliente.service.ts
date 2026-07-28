import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Cuota } from '../enums/cuota.enum';
import { TipoPago } from '../enums/tipoPago.enum';
import { EstadoCliente } from '../enums/estadoCliente.enum';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  private clientes: Cliente[] = [
    {
      id: 1,
      nombre: 'AC/DC',
      estado: EstadoCliente.PAGADO,
      fechaPago: '2026-07-05',
      cuota: Cuota.INDIVIDUAL,
      monto: 15.000,
      tipoPago: TipoPago.EFECTIVO,
      celular: '123456'
    },
    {
      id: 2,
      nombre: 'Dana Walker',
      estado: EstadoCliente.DEBE,
      fechaPago: '2026-06-04',
      cuota: Cuota.INDIVIDUAL,
      monto: 15.000,
      tipoPago: TipoPago.MERCADO_PAGO,
      celular: '451525'
    },
    {
      id: 3,
      nombre: 'Leandro Walker',
      estado: EstadoCliente.DIA,
      fechaPago: '2026-07-14',
      cuota: Cuota.FAMILIARx2,
      monto: 1.000,
      tipoPago: TipoPago.TRANSFERENCIA,
      celular: '898681'
    },
    {
      id: 4,
      nombre: 'Cristina Bovier',
      estado: EstadoCliente.NO_VIENE,
      fechaPago: '2026-07-14',
      cuota: Cuota.INDIVIDUAL,
      monto: 4.000,
      tipoPago: TipoPago.TRANSFERENCIA,
      celular: '157802'
    }
  ];

  constructor() {}

  getClientes(): Cliente[]{
    return this.clientes;
  }

  addCliente(cliente: Cliente): void {
    cliente.id = this.clientes.length + 1;
    this.clientes.push({ ...cliente }); // Así se guarda una copia del objeto
  }
}
