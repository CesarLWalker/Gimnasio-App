import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
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
      monto: '$45.000',
      tipoPago: TipoPago.EFECTIVO,
      celular: '123456'
    }
  ];

  constructor() {}

  getClientes(): Cliente[]{
    return this.clientes;
  }
}
