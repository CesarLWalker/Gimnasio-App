import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonContent } from '@ionic/angular/standalone';
import { HoraTrabajada } from 'src/app/models/horaTrabajada.model';
import { Profesor } from 'src/app/models/profesor.model';
import { HoraTrabajadaService } from 'src/app/services/horaTrabajada.service';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-registrar-horas',
  standalone: true,
  templateUrl: './registrar-horas.component.html',
  styleUrls: ['./registrar-horas.component.scss'],
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonContent ]
})
export class RegistrarHorasComponent  implements OnInit {

  // PROFESORES DISPONIBLES
  profesores: Profesor[] = [];

  // DATOS DEL FORMULARIO
  profesorId: number = 0;
  fecha: string = '';
  horaInicio: string = '';
  horaFin: string = '';
  actividad: string = '';
  observacion: string = '';

  // HORAS CALCULADAS
  horas: number = 0;

  constructor(
    private horaTrabajadaService: HoraTrabajadaService,
    private profesorService: ProfesorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profesores = this.profesorService.getProfesores();

    // FECHA ACTUAL
    const hoy = new Date();

    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');

    this.fecha = `${año}-${mes}-${dia}`;
  }

  calcularHoras(): void {

    if (!this.horaInicio || !this.horaFin) {
      this.horas = 0;
      return;
    }

    const inicio = this.convertirMinutos(this.horaInicio);
    const fin = this.convertirMinutos(this.horaFin);

    if (fin <= inicio) {
      this.horas = 0;
      return;
    }

    const diferencia = fin - inicio;
    this.horas = diferencia / 60;
  }

  private convertirMinutos(hora: string): number {

    const [horas, minutos] = hora.split(':').map(Number);
    return horas * 60 + minutos;
  }

  agregarHora(): void {

    if (
      this.profesorId === 0 ||
      !this.fecha ||
      !this.horaInicio ||
      !this.horaFin ||
      this.horas <= 0
    ) {
      console.log('Faltan datos para registrar las horas');
      return;
    }

    const nuevaHora: HoraTrabajada = {
      id: this.generarNuevoId(),
      profesorId: this.profesorId,
      fecha: this.fecha,
      horaInicio: this.horaInicio,
      horaFin: this.horaFin,
      horas: this.horas,
      actividad: this.actividad,
      observacion: this.observacion
    };

    this.horaTrabajadaService.agregarHora(nuevaHora);
    console.log('Horas registradas: ', nuevaHora);

    this.router.navigate(['/horas-trabajadas']); // Redirige hacia esta página
  }

  private generarNuevoId(): number {
    const horas = this.horaTrabajadaService.getHorasTrabajadas();

    if (horas.length === 0) {
      return 1;
    }

    return Math.max(...horas.map(hora => hora.id)) + 1;
  }

}