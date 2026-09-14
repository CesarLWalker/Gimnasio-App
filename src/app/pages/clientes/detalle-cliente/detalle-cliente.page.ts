import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonItem, IonLabel, IonIcon, IonList, IonSearchbar, IonFab, IonFabButton, IonButton, IonButtons } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { IonicModule } from '@ionic/angular';
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
    private clienteService: ClienteService
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

}
