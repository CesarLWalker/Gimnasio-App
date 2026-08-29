import { Component, OnInit } from '@angular/core';
import { IonHeader, IonCardTitle, IonCol, IonCard, IonCardHeader, IonCardContent, IonGrid, IonRow, IonContent, IonToolbar, IonTitle, IonIcon } from "@ionic/angular/standalone";
import { DashboardCard } from 'src/app/models/dashboard-card';
import { ClienteService } from 'src/app/services/cliente.service';
import { HoraTrabajadaService } from 'src/app/services/horaTrabajada.service';
import { LiquidacionProfesorService } from 'src/app/services/liquidacionProfesor.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { addIcons } from 'ionicons';
import { peopleOutline, checkmarkCircleOutline, alertCircleOutline, closeCircleOutline, calendarOutline, cashOutline, schoolOutline, timeOutline, documentTextOutline, walletOutline} from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [IonTitle, IonToolbar, IonContent, IonRow, IonGrid, IonCardContent, IonCardHeader, IonCard, IonCol, IonCardTitle, IonHeader, IonIcon],
})
export class DashboardPage implements OnInit {

  cards: DashboardCard[] = [];

  constructor(
    private clienteService: ClienteService,
    private profesorService: ProfesorService,
    private horaTrabajadaService: HoraTrabajadaService,
    private liquidacionProfesorService: LiquidacionProfesorService
  ) {
    addIcons({
      peopleOutline,
      checkmarkCircleOutline,
      alertCircleOutline,
      closeCircleOutline,
      calendarOutline,
      cashOutline,
      schoolOutline,
      timeOutline,
      documentTextOutline,
      walletOutline
    });
   }

  ngOnInit(): void {
  }

  // se ejecuta cada vez que entramos nuevamente al Dashboard
  ionViewWillEnter(): void {
    this.cargarDashboard();
  }

  private cargarDashboard(): void {

    console.log("📊 Entré a cargarDashboard");
    console.log('Total clientes:', this.clienteService.getTotalClientes());

    this.cards = [
      {
        icono: 'people-outline',
        titulo: 'Clientes',
        valor: this.clienteService.getTotalClientes().toString(),
        descripcion: 'Total registrados',
        color: 'primary',
        seccion: 'clientes'
      },
      {
        icono: 'checkmark-circle-outline',
        titulo: 'Pagados',
        valor: this.clienteService.getClientesPagados().toString(),
        descripcion: 'Cuota al día',
        color: 'success',
        seccion: 'clientes'
      },
      {
        icono: 'alert-circle-outline',
        titulo: 'Deben',
        valor: this.clienteService.getClientesDeben().toString(),
        descripcion: 'Pendientes',
        color: 'warning',
        seccion: 'clientes'
      },
      {
        icono: 'close-circle-outline',
        titulo: 'No vienen',
        valor: this.clienteService.getClientesNoVienen().toString(),
        descripcion: 'Inactivos',
        color: 'danger',
        seccion: 'clientes'
      },
      {
        icono: 'calendar-outline',
        titulo: 'Mensuales',
        valor: this.clienteService.getClientesMensuales().toString(),
        descripcion: 'Período de pago',
        color: 'tertiary',
        seccion: 'clientes'
      },
      {
        icono: 'cash-outline',
        titulo: 'Recaudado',
        valor: `$ ${this.clienteService.getRecaudacionTotal().toLocaleString('es-AR')}`, // formato Argentina
        descripcion: 'Total cobrado',
        color: 'success',
        seccion: 'finanzas'
      },
       {
        icono: 'school-outline',
        titulo: 'Profesores',
        valor: this.profesorService.getProfesores().length.toString(),
        descripcion: 'Total registrados',
        color: 'secondary',
        seccion: 'profesores'
      },
      {
        icono: 'time-outline',
        titulo: 'Horas trabajadas',
        valor: this.horaTrabajadaService.getTotalHoras().toString(),
        descripcion: 'Total registrado',
        color: 'tertiary',
        seccion: 'profesores'
      },
      {
        icono: 'document-text-outline',
        titulo: 'Liquidaciones',
        valor: this.liquidacionProfesorService.getTotalLiquidaciones().toString(),
        descripcion: 'Total generadas',
        color: 'warning',
        seccion: 'finanzas'
      },
      {
        icono: 'wallet-outline',
        titulo: 'A pagar',
        valor: `$ ${this.liquidacionProfesorService.getTotalPendiente().toLocaleString('es-AR')}`,
        descripcion: 'Total pendiente',
        color: 'danger',
        seccion: 'finanzas'
      }
    ];
  }
}
