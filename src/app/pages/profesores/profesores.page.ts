import { Profesor } from 'src/app/models/profesor'
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.page.html',
  styleUrls: ['./profesores.page.scss'],
  imports: [IonCardContent, IonCardHeader, IonCard, IonCol, IonRow, IonGrid, IonCardTitle, IonContent, IonTitle, IonToolbar, IonHeader],
})
export class ProfesorPage implements OnInit {

  profesores: Profesor[] = [
    {
      icono: "👨‍🏫",
      nombre: "Profesora A",
      sueldo: "$150.000",
      horas: "28hs",
      color: "secondary"
    },
    {
      icono: "👨‍🏫",
      nombre: "Profesora B",
      sueldo: "$140.000",
      horas: "24hs",
      color: "success"
    },
    {
      icono: "👨‍🏫",
      nombre: "Profesor César Walker",
      sueldo: "$70.000",
      horas: "10hs",
      color: "primary"
    },
    {
      icono: "👨‍🏫",
      nombre: "Profesora C",
      sueldo: "$40.000",
      horas: "3hs",
      color: "danger"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
