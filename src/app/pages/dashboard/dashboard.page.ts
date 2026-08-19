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
  /*   {
      icono: '👥',
      titulo: 'Clientes',
      valor: '152',
      descripcion: 'Total registrados',
      color: 'primary'
    },
    {
      icono: '💰',
      titulo: 'Recaudado',
      valor: '$2.350.000',
      descripcion: 'Este mes',
      color: 'success'
    },
    {
      icono: '💳',
      titulo: 'Pendiente',
      valor: '$385.000',
      descripcion: 'Por cobrar',
      color: 'danger'
    },
    {
      icono: '👨‍🏫',
      titulo: 'Profesores',
      valor: '4',
      descripcion: 'Activos',
      color: 'warning'
    },
    {
      icono: '',
      titulo: 'Asistencia',
      valor: '50',
      descripcion: 'Hoy presentes',
      color: 'tertiary'
    },
    {
      icono: '',
      titulo: 'Estadísticas',
      valor: '1520',
      descripcion: 'Datos',
      color: 'secondary'
    }
  ];*/

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
     /* {
        icono: '📊',
        titulo: 'Semanales',
        valor: this.clienteService.getClientesSemanales().toString(),
        descripcion: 'Período de pago',
        color: 'secondary'
      },*/
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
