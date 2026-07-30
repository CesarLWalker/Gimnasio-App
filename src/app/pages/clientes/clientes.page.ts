import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonItem, IonLabel, IonIcon, IonList, IonSearchbar, IonFab, IonFabButton, IonButton } from "@ionic/angular/standalone";
import { EstadoCliente } from 'src/app/enums/estadoCliente.enum';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  imports: [IonButton, IonFabButton, IonFab, IonList,  IonCardHeader, IonCardContent, IonCardTitle, IonCard, IonContent, IonTitle,
     IonToolbar, IonHeader, IonItem, IonLabel, IonIcon, IonSearchbar, FormsModule],
})
export class ClientesPage implements OnInit {
  // Propiedades
  clientes: Cliente[] = [];

  clientesFiltrados: Cliente[] = [];

  searchTerm = '';

  //  Constructor
  constructor(private clienteService: ClienteService, private router: Router) { }

  //  Ciclos de vida
  ngOnInit(): void {

  }

  // Método para refrescar datos, cargar listas
  ionViewWillEnter(): void {
    this.clientes = this.clienteService.getClientes();
    this.clientesFiltrados = [...this.clientes]; //creamos una copia superficial del arreglo. Así podemos filtrar la copia sin afectar la lista original.
  }
    

  // Método para normalizar texto
  public normalizeText(text: string): string {
    return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
  }

  public getEstadoLabel(estado: string): string {

    switch (estado) {
    case EstadoCliente.PAGADO:
      return '🟢 Pagado';

    case EstadoCliente.NO_VIENE:
      return '🔴 No viene';

    case EstadoCliente.MEDIO_MES:
      return '🔵 Medio mes';

    case EstadoCliente.SEMANA:
      return '🟣 Semana';

    case EstadoCliente.DIA:
      return '🟢 Día';

    default:
      return estado;  
    }
  }

  //  Métodos públicos
  public filterClients(): void {

    if (!this.searchTerm.trim()) {
      this.clientesFiltrados = [...this.clientes];
      return;
    }

    const search = this.normalizeText(this.searchTerm);

    this.clientesFiltrados = this.clientes.filter(cliente => this.normalizeText(cliente.nombre).includes(search)
    );
  }

  public goToNuevoCliente(): void {
    //console.log("Botón + presionado");
    this.router.navigate(['/clientes/nuevo-cliente']);
  }

  public editarCliente(cliente: Cliente): void {
    //console.log("Editar cliente: ", cliente);
    this.router.navigate(['/clientes/nuevo-cliente', cliente.id]);
  }

}
