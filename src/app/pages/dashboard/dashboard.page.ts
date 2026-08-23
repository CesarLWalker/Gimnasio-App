import { Component, OnInit } from '@angular/core';
import { IonHeader, IonCardTitle, IonCol, IonCard, IonCardHeader, IonCardContent, IonGrid, IonRow, IonContent, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { DashboardCard } from 'src/app/models/dashboard-card';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [IonTitle, IonToolbar, IonContent, IonRow, IonGrid, IonCardContent, IonCardHeader, IonCard, IonCol, IonCardTitle, IonHeader, ]
})
export class DashboardPage implements OnInit {

  cards: DashboardCard[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
  }

  // se ejecuta cada vez que entramos nuevamente al Dashboard
  ionViewWillEnter(): void {
    this.cargarDashboard();
  }

  private cargarDashboard(): void {

    console.log("📊 Entré a cargarDashboard");
    console.log('Total clientes:', this.clienteService.getTotalClientes());

    const totalClientes = this.clienteService.getTotalClientes();

    const pagados = this.clienteService.getClientesPagados();

    const porVencer = this.clienteService.getClientesPorVencer();

    const deben = this.clienteService.getClientesDeben();

    const noVienen = this.clienteService.getClientesNoVienen();

    const mensuales = this.clienteService.getClientesMensuales();

    const recaudacion = this.clienteService.getRecaudacionTotal();

    console.log('👥 Total clientes:', totalClientes);
    console.log('🟢 Pagados:', pagados);
    console.log('🟡 Por vencer:', porVencer);
    console.log('🔴 Deben:', deben);
    console.log('⚪ No vienen:', noVienen);

    this.cards = [
      {
        icono: '👥',
        titulo: 'Clientes',
        valor: this.clienteService.getTotalClientes().toString(),
        descripcion: 'Total registrados',
        color: 'primary'
      },
      {
        icono: '🟢',
        titulo: 'Pagados',
        valor: this.clienteService.getClientesPagados().toString(),
        descripcion: 'Cuota al día',
        color: 'success'
      },
      {
        icono: '🟡',
        titulo: 'Deben',
        valor: this.clienteService.getClientesDeben().toString(),
        descripcion: 'Pendientes',
        color: 'warning'
      },
      {
        icono: '🔴',
        titulo: 'No vienen',
        valor: this.clienteService.getClientesNoVienen().toString(),
        descripcion: 'Inactivos',
        color: 'danger'
      },
      {
        icono: '📅',
        titulo: 'Mensuales',
        valor: this.clienteService.getClientesMensuales().toString(),
        descripcion: 'Período de pago',
        color: 'tertiary'
      },
      {
        icono: '💰',
        titulo: 'Recaudado',
        valor: `$ ${this.clienteService.getRecaudacionTotal().toLocaleString('es-AR')}`, // formato Argentina
        descripcion: 'Total cobrado',
        color: 'success'
      }
    ];
  }
}
