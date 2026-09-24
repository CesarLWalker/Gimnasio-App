import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  valorHora: number | null = null;
  sueldo: number | null = null;

  estado: EstadoProfesor = EstadoProfesor.ACTIVO;

  // PARA EDICIÓN
  profesorEditandoId: number | null = null;

  // HACEMOS LOS ENUMS DISPONIBLES PARA EL HTML
  TipoRemuneracion = TipoRemuneracion;
  EstadoProfesor = EstadoProfesor;

  constructor(
    private profesorService: ProfesorService,
    private actividadService: ActividadService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.profesorEditandoId = Number(id);

      const profesor = this.profesorService.getProfesores().find(p => p.id === this.profesorEditandoId);

      if (profesor) {
        this.nombre = profesor.nombre;
        this.celular = profesor.celular;
        this.especialidad = profesor.especialidad;
        this.tipoRemuneracion = profesor.tipoRemuneracion;
        this.valorHora = profesor.valorHora;
        this.sueldo = profesor.sueldo;
        this.estado = profesor.estado;
      }
    }
  }

  agregarProfesor(): void {

  // ============================
  // MODO EDICIÓN
  // ============================
  if (this.profesorEditandoId !== null) {

    const profesorActualizado: Profesor = {
      id: this.profesorEditandoId,
      icono: '👨‍🏫',
      nombre: this.nombre,
      celular: this.celular,
      especialidad: this.especialidad,
      sueldo: this.sueldo ?? 0,
      valorHora: this.valorHora ?? 0,
      tipoRemuneracion: this.tipoRemuneracion,
      estado: this.estado,
      color: 'black'
    };

    this.profesorService.actualizarProfesor(profesorActualizado);

    console.log('Profesor actualizado:', profesorActualizado);

    this.router.navigate(['/profesores']);

    return;
  }


  // ============================
  // MODO NUEVO PROFESOR
  // ============================

  const nuevoProfesor: Profesor = {
    id: this.generarNuevoId(),
    icono: '👨‍🏫',
    nombre: this.nombre,
    celular: this.celular,
    especialidad: this.especialidad,
    sueldo: this.sueldo ?? 0,
    valorHora: this.valorHora ?? 0,
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

  console.log('Profesor agregado:', nuevoProfesor);

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
