import { Injectable } from "@angular/core";
import { HoraTrabajada } from "../models/horaTrabajada.model";
import { ProfesorService } from "./profesor.service";

@Injectable({
  providedIn: 'root'
})
export class HoraTrabajadaService {

  horasTrabajadas: HoraTrabajada[] = [

    {
      id: 1,
      profesorId: 1,
      fecha: '2026-08-22',
      horaInicio: '18:00',
      horaFin: '20:00',
      horas: 2,
      actividad: 'Musculación',
      observacion: 'Turno tarde'
    },
    {
      id: 2,
      profesorId: 1,
      fecha: '2026-08-21',
      horaInicio: '15:00',
      horaFin: '20:00',
      horas: 5,
      actividad: 'Musculación',
      observacion: 'Turno tarde'
    },
    {
      id: 3,
      profesorId: 2,
      fecha: '2026-08-22',
      horaInicio: '08:00',
      horaFin: '12:00',
      horas: 4,
      actividad: 'Musculación',
      observacion: 'Turno mañana'
    },
    {
      id: 4,
      profesorId: 3,
      fecha: '2026-08-15',
      horaInicio: '08:00',
      horaFin: '12:00',
      horas: 4,
      actividad: 'Musculación',
      observacion: 'Turno mañana'
    }
  ];

  constructor(
    private profesorService: ProfesorService
  ) {}

  getHorasTrabajadas(): HoraTrabajada[] {
    return this.horasTrabajadas;
  }

  getHorasByProfesor(profesorId: number): HoraTrabajada[] {
    return this.horasTrabajadas.filter(hora => hora.profesorId === profesorId);
  }

  getTotalHorasByProfesor(profesorId: number): number {
    return this.horasTrabajadas
       .filter(hora => hora.profesorId === profesorId)
       .reduce((total, hora) => total + hora.horas, 0);
  }
  getTotalHorasByProfesorYPeriodo(profesorId: number, año: number, mes: number): number {
    return this.horasTrabajadas.filter(hora => {

      const fecha = new Date(hora.fecha);

      return (hora.profesorId === profesorId && fecha.getFullYear() === año && fecha.getMonth() + 1 === mes);
    })
    .reduce((total, hora) => total + hora.horas, 0);
  }

  agregarHora(hora: HoraTrabajada): void {
    this.horasTrabajadas.push(hora);
  }

  eliminarHora(id: number): void {
    this.horasTrabajadas = this.horasTrabajadas.filter(hora => hora.id !== id);
  }

  getTotalAPagarByProfesor(profesorId: number): number {

    const profesor = this.profesorService.getPofesorById(profesorId);

    if (!profesor) {
      return 0;
    }

    const totalHoras = this.getTotalHorasByProfesor(profesorId);

    return totalHoras * profesor.valorHora;
  }
}
