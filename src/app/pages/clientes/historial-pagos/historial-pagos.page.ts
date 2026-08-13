import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { Cliente } from 'src/app/models/cliente.model';
import { Pago } from 'src/app/models/pago.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-historial-pagos',
  templateUrl: './historial-pagos.page.html',
  styleUrls: ['./historial-pagos.page.scss'],
  imports: [IonicModule],
})
export class HistorialPagosPage implements OnInit {

  public cliente: Cliente | undefined;
  public pagos: Pago[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private pagoService: PagoService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('ID del cliente recibido: ', id);

    if (id) {
      // convertir el número ID en cliente
      const clienteId = Number(id);
      // para obtener el cliente
      this.cliente = this.clienteService.getClienteById(clienteId);
      // para obtener los pagos
      this.pagos = this.pagoService.getPagosByCliente(clienteId);

      console.log('Cliente: ', this.cliente);
      console.log('Pagos: ', this.pagos);
    }
  }

  public registrarPago(): void {

    if (!this.cliente) {
      return;
    }

    this.router.navigate(['/pagos/nuevo-pago'], {
      queryParams: {
        clienteId: this.cliente.id
        }
      }
    );
  }

  public editarPago(pago: Pago): void {
    this.router.navigate(['/pagos/nuevo-pago', pago.id]);
  }

  public async eliminarPago(pago: Pago): Promise<void> {

    const alert = await this.alertController.create({

      header: 'Eliminar pago',
      message: `¿Estás seguro de eliminar este pago de $${pago.monto}?`,

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',

          handler: () => {

            this.pagoService.deletePago(pago.id);

            // Actualizamos el historial
            if (this.cliente) {
              this.pagos = this.pagoService.getPagosByCliente(this.cliente.id);
            }
          }
        }
      ]

    });
    await alert.present();
  }

  public formatearFecha(fecha: string): string {

    if (!fecha) {
      return '';
    }

    const partes = fecha.split('-');

    if (partes.length !== 3) {
      return fecha;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }


}
