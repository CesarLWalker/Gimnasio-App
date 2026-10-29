import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonList, IonIcon, IonFabButton, IonFab, IonButton, IonItem, IonLabel, IonCardContent, IonCardHeader, IonCard, IonCardTitle,  IonTitle, IonSearchbar, IonListHeader, IonInput } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

interface EjercicioRutina {
  id: number;
  nombre: string;
  series: number;
  repeticiones: string | any;
}

@Component({
  selector: 'app-rutinas',
  standalone: true,
  templateUrl: './rutinas.page.html',
  styleUrls: ['./rutinas.page.scss'],
  imports: [IonInput, IonListHeader, IonList, IonIcon, IonFabButton, IonFab, FormsModule, IonButton, IonItem, IonLabel, IonCardContent, IonCardHeader, IonCard,
    IonCardTitle, IonContent, IonTitle, IonToolbar, IonHeader, IonSearchbar ],
})
export class RutinasPage implements OnInit {

  private readonly claveStorage = 'gym-manager-rutinas';

  nombreEjercicio = '';
  series = 3;
  repeticiones = '';

  ejercicios: EjercicioRutina[] = [
    { id: 1, nombre: 'Sentadilla', series: 4, repeticiones: '12.10.8.6' },
    { id: 2, nombre: 'Press banca plano', series: 4, repeticiones: '12.10.8.6' },
    { id: 3, nombre: 'Vuelos laterales', series: 4, repeticiones: '15.15.12.12' },
  ];

  constructor() { }

  ngOnInit(): void {
    const guardados = localStorage.getItem(this.claveStorage);

    if (guardados !== null) {
      try {
        this.ejercicios = JSON.parse(guardados) as EjercicioRutina[];
      } catch {
        this.guardarEjercicios();
      }
    } else {
      this.guardarEjercicios();
    }
  }

  agregarEjercicio(): void {
    const nombre = this.nombreEjercicio.trim();
    const cantidadSeries = Number(this.series);
    const cantidadRepeticiones = this.repeticiones.trim();

    if (!nombre) {
      alert('Ingresá el nombre del ejercicio.');
      return;
    }

    if (
      !Number.isInteger(cantidadSeries) || cantidadSeries < 1 ) {
       alert('Las series deben ser mayores que cero.');
       return;
    }

    if (!cantidadRepeticiones) {
      alert('Ingresá las repeticiones.');
      return;
    }

    this.ejercicios = [
      ...this.ejercicios,
      { id: Date.now(), nombre, series: cantidadSeries, repeticiones: cantidadRepeticiones },
    ];

    this.nombreEjercicio = '';
    this.series = 3;
    this.repeticiones = '';

    this.guardarEjercicios();
  }

  eliminarEjercicio(id: number): void {
    this.ejercicios = this.ejercicios.filter(ejercicio => ejercicio.id !== id);
    this.guardarEjercicios();
  }

  private guardarEjercicios(): void {
    localStorage.setItem(this.claveStorage, JSON.stringify(this.ejercicios));
  }

}
