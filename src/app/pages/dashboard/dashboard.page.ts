import { Component, OnInit } from '@angular/core';
import { IonHeader, IonCardTitle, IonCol, IonCard, IonCardHeader, IonCardContent, IonGrid, IonRow, IonContent, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { DashboardCard } from 'src/app/models/dashboard-card';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [IonTitle, IonToolbar, IonContent, IonRow, IonGrid, IonCardContent, IonCardHeader, IonCard, IonCol, IonCardTitle, IonHeader, ]
})
export class DashboardPage implements OnInit {

  cards: DashboardCard[] = [
     {
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
  ];

  constructor() { }

  ngOnInit() {
  }

}
