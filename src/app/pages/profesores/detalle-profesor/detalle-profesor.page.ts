import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonButton, IonButtons, IonFabButton, IonFab, IonList, IonCardHeader, IonCardContent, IonCardTitle, IonCard, IonContent, IonTitle, IonToolbar, IonHeader, IonItem, IonLabel, IonIcon, IonSearchbar } from '@ionic/angular/standalone';
import { Profesor } from 'src/app/models/profesor.model';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-detalle-profesor',
  standalone: true,
  templateUrl: './detalle-profesor.page.html',
  styleUrls: ['./detalle-profesor.page.scss'],
  imports: [ IonButton, IonButtons, IonFabButton, IonFab, IonList,  IonCardHeader, IonCardContent, IonCardTitle, IonCard, IonContent, IonTitle,
       IonToolbar, IonHeader, IonItem, IonLabel, IonIcon, IonSearchbar, FormsModule ],
})
export class DetalleProfesorPage implements OnInit {

  profesor: Profesor | undefined;
  getUltimoCobro: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profesorService: ProfesorService,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.profesor = this.profesorService.getProfesores().find(profesor => profesor.id === id);
  }

  // Volver a la lista Profesores
  volver(): void {
    this.router.navigate(['/profesores']);
  }

  // Editar profesor
  editarProfesor(): void {

    if (!this.profesor) {
      return;
    }

    this.router.navigate(['/profesores/nuevo-profesor', this.profesor.id]);
  }

   // Estado profesor
  public getEstadoLabel(estado: string): string {

    switch (estado) {

      case 'ACTIVO':
        return '🟢 Activo';

      case 'INACTIVO':
        return '🔴 Inactivo';

      default:
        return estado;
    }
  }

  // Ver historial de cobros
  verHistorialCobros(): void {

    if (!this.profesor) {
      return;
    }

    this.router.navigate(['/profesores', this.profesor.id, '/liquidaciones']);
  }

  // Eliminar profesor
   public async eliminarProfesor(profesor: Profesor): Promise<void> {
  
      const alert = await this.alertController.create({
        header: 'Eliminar profesor',
        message: `¿Estás seguro que desea eliminar a ${profesor.nombre}?`, // comillas invertidas (backticks)
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: () => {
              this.profesorService.deleteProfesor(profesor.id);
            }
          }
        ]
      });
       await alert.present();
      console.log("Profesor eliminado: ", profesor);
    }

}
