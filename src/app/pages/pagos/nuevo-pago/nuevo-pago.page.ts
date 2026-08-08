import { TipoPago } from 'src/app/enums/tipoPago.enum';
import { Pago } from './../../../models/pago.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PagoService } from './../../../services/pago.service';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: 'app-nuevo-pago',
  standalone: true,
  templateUrl: './nuevo-pago.page.html',
  styleUrls: ['./nuevo-pago.page.scss'],
  imports: [IonicModule, FormsModule, BrowserModule]
})
export class NuevoPagoPage implements OnInit {

  public TipoPago = TipoPago;
  public clientes: Cliente[] = [];

  pago: Pago = {

    id: 0,
    clienteId: 0,
    fecha: '',
    monto: 1000,
    tipoPago: TipoPago.EFECTIVO,
    observacion: '',
   };

  public modoEdicion = false;

  constructor(
    private pagoService: PagoService,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
    console.log("Clientes para nuevo pago: " , this.clientes);
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


