import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonList, IonIcon, IonFabButton, IonFab, IonButton, IonItem, IonLabel, IonCardContent, IonCardHeader, IonCard, IonCardTitle,  IonTitle, IonSearchbar, IonListHeader, IonInput, IonText, IonCardSubtitle, IonBadge, IonSpinner } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { EjercicioRutina } from 'src/app/models/ejercicioRutina.model';
import { Rutina } from 'src/app/models/rutina.model';
import { RutinasService } from 'src/app/services/rutinas.service';

@Component({
  selector: 'app-rutinas',
  standalone: true,
  templateUrl: './rutinas.page.html',
  styleUrls: ['./rutinas.page.scss'],
  imports: [IonSpinner, IonBadge, IonCardSubtitle, IonText, IonInput, IonListHeader, IonList, IonIcon, IonFabButton, IonFab, FormsModule, IonButton, IonItem, IonLabel, IonCardContent, IonCardHeader, IonCard,
    IonCardTitle, IonContent, IonTitle, IonToolbar, IonHeader, IonSearchbar ],
})
export class RutinasPage implements OnInit {

  rutinas: Rutina[] = [];

  cargando = false;
  error = '';
  rutinaExpandidaId: number | null = null;


  constructor(
    private rutinasService: RutinasService
  ) { }

  ngOnInit(): void {
    this.cargarRutinas();
  }

  // Consultar rutinas guardadas en MySQL
  cargarRutinas(): void {
    this.cargando = true;
    this.error = '';

    this.rutinasService.listar().subscribe({
      next: (respuesta) => {
        this.rutinas = respuesta;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar rutinas: ', error);
        this.error = 'No se pudieron cargar las rutinas.';
        this.cargando = false;
      }
    });
  }

  // Mostrar u ocultar el detalle
  verDetalle(id: number): void {
    this.rutinaExpandidaId = this.rutinaExpandidaId === id ? null : id;
  }

  // Eliminar una rutina
  eliminarRutina(rutina: Rutina): void {
    if(!rutina.id) return;

    const confirmar = window.confirm(`¿Querés eliminar la rutina "${rutina.nombre}"?`);

    if (!confirmar) return;

    this.rutinasService.eliminar(rutina.id).subscribe({next: () => {
      this.rutinas = this.rutinas.filter(r => r.id !== rutina.id);

      if (this.rutinaExpandidaId === rutina.id) {
        this.rutinaExpandidaId = null;
      }

      alert('Rutina eliminada correctamente.');
    },
  error: (error) => {
    console.error('Error al eliminar rutina:', error);
    alert('No se pudo eliminar la rutina.');
  }
});
  }
}
