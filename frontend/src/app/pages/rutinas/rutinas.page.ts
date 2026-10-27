import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonList, IonIcon, IonFabButton, IonFab, IonButton, IonItem, IonLabel, IonCardContent, IonCardHeader, IonCard,
    IonCardTitle,  IonTitle, IonSearchbar  } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rutinas',
  standalone: true,
  templateUrl: './rutinas.page.html',
  styleUrls: ['./rutinas.page.scss'],
  imports: [ IonList, IonIcon, IonFabButton, IonFab, FormsModule, IonButton, IonItem, IonLabel, IonCardContent, IonCardHeader, IonCard,
      IonCardTitle, IonContent, IonTitle, IonToolbar, IonHeader, IonSearchbar ],
})
export class RutinasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
