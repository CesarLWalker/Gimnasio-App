import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonItem, IonLabel, IonIcon, IonList, IonSearchbar, IonFab, IonFabButton, IonButton, IonButtons } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { IonicModule, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.page.html',
  styleUrls: ['./detalle-cliente.page.scss'],
  imports: [IonButton, IonButtons, IonFabButton, IonFab, IonList,  IonCardHeader, IonCardContent, IonCardTitle, IonCard, IonContent, IonTitle,
     IonToolbar, IonHeader, IonItem, IonLabel, IonIcon, IonSearchbar, FormsModule],
})
export class DetalleClientePage implements OnInit {

  cliente: Cliente | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.cliente = this.clienteService.getClientes().find(cliente => cliente.id === id);
  }

  // Volver a la lista de clientes
  volver(): void {
    this.router.navigate(['/clientes']);
  }

  // Editar cliente
  editarCliente(): void {

    if (!this.cliente) {
      return;
    }

    this.router.navigate(['/clientes', 'nuevo-cliente', this.cliente.id]);
  }

  // Ver historial de pagos
  verHistorialPagos(): void {

    if (!this.cliente) {
      return;
    }

    this.router.navigate(['/clientes', this.cliente.id, 'historial-pagos']);
  }

  public async eliminarCliente(cliente: Cliente): Promise<void> {

    const alert = await this.alertController.create({
      header: 'Eliminar cliente',
      message: `¿Estás seguro que desea eliminar a ${cliente.nombre}?`, // comillas invertidas (backticks)
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this. clienteService.deleteCliente(cliente.id);
          }
        }
      ]
    });
     await alert.present();
    console.log("Cliente eliminado: ", cliente);
  }

  public getEstadoLabel(estado: string): string {

    switch (estado) {

      case 'PAGADO':
        return '🟢 Pagado';

      case 'POR VENCER':
        return '🟡 Por vencer';

      case 'DEBE':
        return '🔴 Debe';

      case 'NO VIENE':
        return '⚫ No viene';

      default:
        return estado;
    }
  }

  public getPeriodoPagoLabel(periodo: string): string {

    switch (periodo) {

      case 'MES':
        return '📅 Mes';

      case 'MEDIO_MES':
        return '📅 Medio mes';

      case 'SEMANA':
        return '📅 Semana';

      case 'DIA':
        return '📅 Día';

      default:
        return periodo;
    }
  }

}
