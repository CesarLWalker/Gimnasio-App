import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonCardContent, IonCard, IonCardTitle, IonCardHeader, IonItem, IonLabel, IonInput, IonSelect, IonButton, IonContent, IonSelectOption } from "@ionic/angular/standalone";
import { EstadoProfesor } from 'src/app/enums/estadoProfesor.enum';
import { TipoRemuneracion } from 'src/app/enums/tipoRemuneracion.enum';
import { Profesor } from 'src/app/models/profesor.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-nuevo-profesor',
  standalone: true,
  templateUrl: './nuevo-profesor.component.html',
  styleUrls: ['./nuevo-profesor.component.scss'],
  imports: [IonContent, IonButton, IonInput, IonLabel, IonItem, IonCardHeader, IonCardTitle, IonCardContent, IonTitle, IonToolbar,
    IonHeader, IonCard, IonSelect, FormsModule, IonSelectOption],
})
export class NuevoProfesorComponent  implements OnInit {

  // CAMPOS DEL FORMULARIO
  nombre: string = '';
  celular: string = '';
  especialidad: string = '';

  tipoRemuneracion: TipoRemuneracion = TipoRemuneracion.POR_HORA;

  valorHora: number = 0;
  sueldo: number = 0;

  estado: EstadoProfesor = EstadoProfesor.ACTIVO;

  // PARA EDICIÓN
  profesorEditandoId: number | null = null;

  // HACEMOS LOS ENUMS DISPONIBLES PARA EL HTML
  TipoRemuneracion = TipoRemuneracion;
  EstadoProfesor = EstadoProfesor;

  constructor(
    private profesorService: ProfesorService,
    private actividadService: ActividadService,
    private router: Router
  ) { }

  ngOnInit() {}

  agregarProfesor(): void {

    const nuevoProfesor: Profesor = {
      id: this.generarNuevoId(),
      icono: '👨‍🏫',
      nombre: this.nombre,
      celular: this.celular,
      especialidad: this.especialidad,
      sueldo: this.sueldo,
      valorHora: this.valorHora,
      tipoRemuneracion: this.tipoRemuneracion,
      estado: this.estado,
      color: 'black'
    };

    this.profesorService.agregarProfesor(nuevoProfesor);

    this.actividadService.agregarActividad({
      icono: '👨‍🏫',
      titulo: 'Nuevo profesor',
      descripcion: nuevoProfesor.nombre,
      fecha: this.obtenerFechaLocal(),
      ruta: '/profesores/nuevo-profesor'
    });

    console.log('Profesor agregado: ', nuevoProfesor);
    this.router.navigate(['/profesores']);
  }

  private obtenerFechaLocal(): string {
    const hoy = new Date();

    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');

    return `${año}-${mes}-${dia}`;
  }

  private generarNuevoId(): number {
    const profesores = this.profesorService.getProfesores();

    if (profesores.length === 0) {
      return 1;
    }

    return Math.max(...profesores.map(profesor => profesor.id)) + 1;
  }

}
