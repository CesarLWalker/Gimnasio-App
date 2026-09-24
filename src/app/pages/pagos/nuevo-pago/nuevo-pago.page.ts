import { TipoPago } from 'src/app/enums/tipoPago.enum';
import { Pago } from './../../../models/pago.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PagoService } from './../../../services/pago.service';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-nuevo-pago',
  standalone: true,
  templateUrl: './nuevo-pago.page.html',
  styleUrls: ['./nuevo-pago.page.scss'],
  imports: [IonicModule, FormsModule]
})
export class NuevoPagoPage implements OnInit {

  public TipoPago = TipoPago;
  public clientes: Cliente[] = [];

  pago: Pago = {

    id: 2,
    clienteId: 2,
    fecha: '',
    monto: 1200,
    tipoPago: TipoPago.EFECTIVO,
    observacion: '',
   };

  public modoEdicion = false;

  constructor(
    private pagoService: PagoService,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {  console.log('🚀 SE CREÓ NUEVOPAGOPAGE');}

  ngOnInit(): void {

    this.clientes = this.clienteService.getClientes();
    console.log("Clientes para nuevo pago: " , this.clientes);

    const clienteId = this.activatedRoute.snapshot.queryParamMap.get('clienteId');

    if (clienteId && !this.activatedRoute.snapshot.paramMap.get('id')) {
      this.pago.clienteId = Number(clienteId);
    }

    // Obtiene el ID de la URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    //console.log('ID recibido: ', id);

    if (id) { // verifica si hay un ID
      const pagoEncontrado = this.pagoService.getPagoById(Number(id)); // busca el cliente

      if (pagoEncontrado) {
        // operador de propagación ( ... )
        this.pago = { ...pagoEncontrado }; // carga los datos en el formulario
        this.modoEdicion = true; // activamos el modo edición
      }
    }
  }

    public guardarPago(): void {

      if (this.modoEdicion) {
        this.pagoService.updatePago(this.pago); // Actualiza pago
        console.log('Pago actualizado: ', this.pago);
      } else {
        this.pagoService.addPago(this.pago); // Agrega pago
        console.log('Pago agregado: ', this.pago);
      }

      this.router.navigate(['/pagos']);
    }

}


