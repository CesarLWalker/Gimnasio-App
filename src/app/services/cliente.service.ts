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
      nombre: 'César Walker',
      estado: EstadoCliente.PAGADO,
      fechaPago: '05/07/2026',
      cuota: Cuota.INDIVIDUAL,
      monto: '45.000',
      tipoPago: TipoPago.EFECTIVO,
      celular: '123456'
    },
    {
      id: 2,
      nombre: 'Dana Walker',
      estado: EstadoCliente.DEBE,
      fechaPago: '04/06/2026',
      cuota: Cuota.INDIVIDUAL,
      monto: '45.000',
      tipoPago: TipoPago.MERCADO_PAGO,
      celular: '451525'
    },
    {
      id: 3,
      nombre: 'Leandro Walker',
      estado: EstadoCliente.DIA,
      fechaPago: '14/07/2026',
      cuota: Cuota.FAMILIARx2,
      monto: '10.000',
      tipoPago: TipoPago.TRANSFERENCIA,
      celular: '898681'
    },
    {
      id: 4,
      nombre: 'Cristina Bovier',
      estado: EstadoCliente.NO,
      fechaPago: '14/07/2026',
      cuota: Cuota.INDIVIDUAL,
      monto: '40.000',
      tipoPago: TipoPago.TRANSFERENCIA,
      celular: '157802'
    }
  ];

  constructor() {}

  getClientes(): Cliente[]{
    return this.clientes;
  }
}
