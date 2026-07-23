import { Component, OnInit } from '@angular/core';
import { IonHeader } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { EstadoCliente } from 'src/app/enums/estadoCliente.enum';
import { TipoPago } from 'src/app/enums/tipoPago.enum';
import { Cuota } from 'src/app/enums/cuota.enum';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-nuevo-cliente',
  standalone: true,
  templateUrl: './nuevo-cliente.page.html',
  styleUrls: ['./nuevo-cliente.page.scss'],
  imports: [ IonicModule, FormsModule],
})
export class NuevoClientePage implements OnInit {

  private clienteService: ClienteService = new ClienteService;
  private router: Router = new Router;

  cliente: Cliente = {
    id: 0,
    nombre: '',
    celular: '',
    estado: EstadoCliente.PAGADO,
    fechaPago: '',
    cuota: Cuota.INDIVIDUAL,
    monto: 1000,
    tipoPago: TipoPago.EFECTIVO
  };

  constructor() { }

  ngOnInit() {
  }

  public guardarCliente(): void {
    this.clienteService.addCliente(this.cliente);
    this.router.navigate(['/clientes']);
    //console.log(this.cliente);
  }

}
