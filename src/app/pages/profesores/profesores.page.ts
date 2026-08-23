import { ProfesorService } from './../../services/profesor.service';
import { Profesor } from 'src/app/models/profesor.model'
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.page.html',
  styleUrls: ['./profesores.page.scss'],
  imports: [IonCardContent, IonCardHeader, IonCard, IonCol, IonRow, IonGrid, IonCardTitle, IonContent, IonTitle, IonToolbar, IonHeader],
})
export class ProfesorPage implements OnInit {

 profesores: Profesor[] = [];

  constructor(
    private profesorService: ProfesorService
  ) { }

  ngOnInit() {
    this.profesores = this.profesorService.getProfesores(); // trae los profesores del servicio
  }

}
