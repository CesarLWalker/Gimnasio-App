import { Component, OnInit } from '@angular/core';
import { IonHeader } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo-cliente',
  standalone: true,
  templateUrl: './nuevo-cliente.page.html',
  styleUrls: ['./nuevo-cliente.page.scss'],
  imports: [ IonicModule, FormsModule],
})
export class NuevoClientePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
