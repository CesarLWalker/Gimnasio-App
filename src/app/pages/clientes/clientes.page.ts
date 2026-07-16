import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonItem, IonLabel, IonIcon, IonList, IonSearchbar } from "@ionic/angular/standalone";
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  imports: [IonList,  IonCardHeader, IonCardContent, IonCardTitle, IonCard, IonContent, IonTitle,
     IonToolbar, IonHeader, IonItem, IonLabel, IonIcon, IonSearchbar],
})
export class ClientesPage implements OnInit {

  clientes: Cliente[] = [];

  searchTerm = '';

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
  }


}
