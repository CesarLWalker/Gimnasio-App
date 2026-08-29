import { ProfesorService } from './../../services/profesor.service';
import { Profesor } from 'src/app/models/profesor.model'
import { Component, OnInit } from '@angular/core';
import { IonSelect, IonSelectOption, IonHeader, IonToolbar, IonTitle, IonContent, IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonLabel, IonItem, IonInput, IonButton } from "@ionic/angular/standalone";
import { TipoRemuneracion } from 'src/app/enums/tipoRemuneracion.enum';
import { EstadoProfesor } from 'src/app/enums/estadoProfesor.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profesores',
  standalone: true,
  templateUrl: './profesores.page.html',
  styleUrls: ['./profesores.page.scss'],
  imports: [FormsModule, IonButton, IonInput, IonItem, IonLabel, IonCardContent, IonCardHeader, IonCard, IonCol, IonRow, 
    IonGrid, IonCardTitle, IonContent, IonTitle, IonToolbar, IonHeader, IonSelect, IonSelectOption],
})
export class ProfesorPage implements OnInit {

 profesores: Profesor[] = [];

 profesorEditandoId: number | null = null; // Profesor que se está editando

 icono = '👨‍🏫';
 nombre = '';
 celular = '';
 especialidad = '';
 sueldo = 0;
 valorHora = 0;

 tipoRemuneracion: TipoRemuneracion = TipoRemuneracion.POR_HORA;
 estado: EstadoProfesor = EstadoProfesor.ACTIVO;
 color = 'primary';
 TipoRemuneracion = TipoRemuneracion;
 EstadoProfesor = EstadoProfesor;

  constructor(
    private profesorService: ProfesorService
  ) { }

  ngOnInit() {
    this.profesores = this.profesorService.getProfesores(); // trae los profesores del servicio
  }

  agregarProfesor(): void {

    if (this.profesorEditandoId !== null) {

      const profesorActualizado: Profesor = {
         id: this.profesorEditandoId,
         icono: this.icono,
         nombre: this.nombre,
         celular: this.celular,
         especialidad: this.especialidad,
         sueldo: this.sueldo,
         valorHora: this.valorHora,
         tipoRemuneracion: this.tipoRemuneracion,
         estado: this.estado,
         color: this.color
      };

      this.profesorService.actualizarProfesor(profesorActualizado);
    } else {

     const nuevoProfesor: Profesor = {
      id: this.generarNuevoId(),
      icono: this.icono,
      nombre: this.nombre,
      celular: this.celular,
      especialidad: this.especialidad,
      sueldo: this.sueldo,
      valorHora: this.valorHora,
      tipoRemuneracion: this.tipoRemuneracion,
      estado: this.estado,
      color: this.color
     };

      this.profesorService.agregarProfesor(nuevoProfesor);
    }

    this.profesores = this.profesorService.getProfesores();
    this.limpiarFormulario();
  }

  editarProfesor(profesor: Profesor): void {
    this.profesorEditandoId = profesor.id;

    this.icono = profesor.icono;
    this.nombre = profesor.nombre;
    this.celular = profesor.celular;
    this.especialidad = profesor.especialidad;
    this.sueldo = profesor.sueldo;
    this.valorHora = profesor.valorHora;

    this.tipoRemuneracion = profesor.tipoRemuneracion;
    this.estado = profesor.estado;
    this.color = profesor.color;
  }

  private generarNuevoId(): number {

    if (this.profesores.length === 0) {
      return 1;
    }

    return Math.max(...this.profesores.map(profesor => profesor.id)) + 1;
  }

  limpiarFormulario(): void {
    this.profesorEditandoId = null;

    this.icono = '👨‍🏫';
    this.nombre = '';
    this.celular = '';
    this.especialidad = '';
    this.sueldo = 0;
    this.valorHora = 0;

    this.tipoRemuneracion = TipoRemuneracion.POR_HORA;
    this.estado = EstadoProfesor.ACTIVO;
    this.color = 'primary';
  }
}
