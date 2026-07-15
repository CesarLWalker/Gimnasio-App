import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonCardHeader, IonGrid, IonRow } from "@ionic/angular/standalone";
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  imports: [ IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonCard, IonContent, IonTitle, IonToolbar, IonHeader],
})
export class ClientesPage implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
  }


}
