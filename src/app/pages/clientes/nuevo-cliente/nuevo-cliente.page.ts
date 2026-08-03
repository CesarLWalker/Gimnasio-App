import { Component, OnInit } from '@angular/core';
import { IonHeader } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { EstadoCliente } from 'src/app/enums/estadoCliente.enum';
import { TipoPago } from 'src/app/enums/tipoPago.enum';
import { Cuota } from 'src/app/enums/cuota.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { PeriodoPago } from 'src/app/enums/periodoPago';

@Component({
  selector: 'app-nuevo-cliente',
  standalone: true,
  templateUrl: './nuevo-cliente.page.html',
  styleUrls: ['./nuevo-cliente.page.scss'],
  imports: [ IonicModule, FormsModule],
})
export class NuevoClientePage implements OnInit {

  public EstadoCliente = EstadoCliente;
  public PeriodoPago = PeriodoPago;

  cliente: Cliente = {
    id: 0,
    nombre: '',
    celular: '',
    estado: EstadoCliente.PAGADO,
    periodoPago: PeriodoPago.MES,
    fechaPago: '',
    cuota: Cuota.INDIVIDUAL,
    monto: 1000,
    tipoPago: TipoPago.EFECTIVO
  };

  public modoEdicion = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtiene el ID de la URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    //console.log('ID recibido: ', id);
    if (id) { // verifica si hay un ID
      const clienteEncontrado = this.clienteService.getClienteById(Number(id)); // busca el cliente

      if (clienteEncontrado) {
        // operador de propagación ( ... )
        this.cliente = { ...clienteEncontrado }; // carga los datos en el formulario
        this.modoEdicion = true; // activamos el modo edición
      }
    }
  }

  public guardarCliente(): void {

    if (this.modoEdicion) {
      this.clienteService.updateCliente(this.cliente); // Actualiza cliente
      console.log('Cliente actualizado: ', this.cliente);
    } else {
      this.clienteService.addCliente(this.cliente); // Agrega cliente
      console.log('Cliente agregado: ', this.cliente);
    }

    this.router.navigate(['/clientes']);
  }

}
