import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent,  IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { HoraTrabajada } from 'src/app/models/horaTrabajada.model';
import { Profesor } from 'src/app/models/profesor.model';
import { HoraTrabajadaService } from 'src/app/services/horaTrabajada.service';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-horas-trabajadas',
  standalone: true,
  templateUrl: './horas-trabajadas.page.html',
  styleUrls: ['./horas-trabajadas.page.scss'],
  imports: [FormsModule, IonContent, IonTitle, IonHeader, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption,
     IonInput, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class HorasTrabajadasPage implements OnInit {

  profesores: Profesor[] = [];
  horasTrabajadas: HoraTrabajada[] = []; // todas las horas

  profesorSeleccionadoId: number | null = null; // Formulario para registrar una hora

  // Filtros
  profesorFiltroId: number | null = null; // Filtro de la tabla
  horasFiltradas: HoraTrabajada[] = []; // las que mostramos después del filtro
  totalHorasFiltradas = 0;

  periodoFiltro = '';

  fecha = '';
  horaInicio = '';
  horaFin = '';
  horas = 0;
  actividad = '';
  observacion = '';

  constructor(
    private profesorService: ProfesorService,
    private horaTrabajadaService: HoraTrabajadaService
  ) { }

  ngOnInit(): void {

    this.profesores = this.profesorService.getProfesores();
    this.horasTrabajadas = this.horaTrabajadaService.getHorasTrabajadas();

    this.horasFiltradas = this.horasTrabajadas;

    this.calcularTotalHoras();
    this.filtrarHoras();
  }

  filtrarHoras(): void {
     
    this.horasFiltradas = this.horasTrabajadas.filter(hora => {

      const coincideProfesor = this.profesorFiltroId === null || hora.profesorId === this.profesorFiltroId;

      const coincidePeriodo = !this.periodoFiltro || hora.fecha.startsWith(this.periodoFiltro);

      return coincideProfesor && coincidePeriodo;
    });

    this.calcularTotalHoras();
  }

  calcularTotalHoras(): void {

    this.totalHorasFiltradas = this.horasFiltradas.reduce((total, hora) => total + hora.horas, 0);
  }

  calcularHoras(): void {

    if (!this.horaInicio || !this.horaFin) {
      this.horas = 0;
      return;
    }

    const inicio = this.horaInicio.split(':');
    const fin = this.horaFin.split(':');

    const minutosInicio = Number(inicio[0]) * 60 + Number(inicio[1]);

    const minutosFin = Number(fin[0]) * 60 + Number(fin[1]);

    const diferencia = minutosFin - minutosInicio;

    if (diferencia <= 0) {
      this.horas = 0;
      return;
    }

    this.horas = diferencia / 60;
  }

  registrarHora(): void {

    if (
      this.profesorSeleccionadoId === null ||
      !this.fecha ||
      !this.horaInicio ||
      !this.horaFin ||
      this.horas <= 0 ||
      !this.actividad
    ) {
      return;
    }

    const nuevaHora: HoraTrabajada = {

      id: this.horasTrabajadas.length + 1,
      profesorId: this.profesorSeleccionadoId,
      fecha: this.fecha,
      horaInicio: this.horaInicio,
      horaFin: this.horaFin,
      horas: this.horas,
      actividad: this.actividad,
      observacion: this.observacion || undefined
    };

    this.horaTrabajadaService.agregarHora(nuevaHora);

    this.horasTrabajadas = this.horaTrabajadaService.getHorasTrabajadas();

    this.filtrarHoras();

    this.limpiarFormulario();
  }

  eliminarHora(id: number): void {

    this.horaTrabajadaService.eliminarHora(id);

    this.horasTrabajadas = this.horaTrabajadaService.getHorasTrabajadas();

    this.filtrarHoras();
  }

  limpiarFormulario(): void {

    this.profesorSeleccionadoId = null;
    this.fecha = '';
    this.horaInicio = '';
    this.horaFin = '';
    this.horas = 0;
    this.actividad = '';
    this.observacion = '';
  }

  limpiarFiltros(): void {

    this.profesorFiltroId = null;
    this.periodoFiltro = '';

    this.filtrarHoras();
  }

}
