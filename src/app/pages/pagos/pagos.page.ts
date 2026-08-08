import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonCard, IonList, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonButton, IonIcon, IonSearchbar, IonFab, IonFabButton } from "@ionic/angular/standalone";
import { Pago } from 'src/app/models/pago.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
  imports: [IonFabButton, IonFab, IonSearchbar, IonIcon, IonButton, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonList,
      IonCard, IonItem, IonContent, IonTitle, IonToolbar, IonHeader, FormsModule],
})
export class PagosPage implements OnInit {

  pagos: Pago[] = [];

  pagosFiltrados: Pago[] = [];

  public searchTerm = '';

  constructor(
    private pagoService: PagoService,
    private clienteService: ClienteService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

   // Método para refrescar datos, cargar listas
  ionViewWillEnter(): void {
    this.pagos = this.pagoService.getPagos();
    this.pagosFiltrados = [...this.pagos]; //creamos una copia superficial del arreglo. Así podemos filtrar la copia sin afectar la lista original.
  }

  // Método para normalizar texto
  public normalizeText(text: string): string {
    return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
  }

  //  Métodos públicos
  // método le pregunta al ClienteService cuál es el nombre del cliente con ese ID
  public getNombreCliente(clienteId: number): string {
    const cliente = this.clienteService.getClienteById(clienteId);
    return cliente ? cliente.nombre : 'Cliente no encontrado';
  }

  public filterPagos(): void {

    if (!this.searchTerm.trim()) {
        this.pagosFiltrados = [...this.pagos];
        return;
    }

    const search = this.normalizeText(this.searchTerm);

    this.pagosFiltrados = this.pagos.filter(pago => {
      const nombreCliente = this.getNombreCliente(pago.clienteId);
      return (
        this.normalizeText(nombreCliente).includes(search) ||
        this.normalizeText(pago.id.toString()).includes(search)
      );
    });
  }
  /*
  public formatearFecha(fecha: string): string {

    if (!fecha) {
      return '';
    }

    const partes = fecha.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }
  */
  public goToNuevoPago(): void {
    //console.log("Botón + presionado");
    this.router.navigate(['/pagos/nuevo-pago']);
  }

  public editarPago(pago: Pago): void {
    //console.log("Editar pago: ", pago);
    this.router.navigate(['/pagos/nuevo-pago', pago.id]);
  }

  public async eliminarPago(pago: Pago): Promise<void> {

    const alert = await this.alertController.create({
      header: 'Eliminar pago',
      message: `¿Estás seguro que desea eliminar este ${pago.id}?`, // comillas invertidas (backticks)
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
            this.pagos = this.pagoService.getPagos();
            this.pagosFiltrados = [ ...this.pagos ];
          }
        }
      ]
    });

    await alert.present();
    console.log("Pago eliminado: ", pago);
  }
}
