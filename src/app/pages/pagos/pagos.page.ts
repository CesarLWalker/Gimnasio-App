import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
  imports: [IonContent, IonTitle, IonToolbar, IonHeader],
})
export class PagosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
