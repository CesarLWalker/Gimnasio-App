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

  // ==========================================
  // OBTENER TODAS LAS HORAS
  // ==========================================
  getHorasTrabajadas(): HoraTrabajada[] {
    return this.horasTrabajadas;
  }

  // ==========================================
  // OBTENER UNA HORA POR ID
  // ==========================================
  getHorasById(id: number): HoraTrabajada | undefined {
    return this.horasTrabajadas.find(hora => hora.id === id);
  }

  // ==========================================
  // TOTAL DE HORAS
  // ==========================================
  getTotalHoras(): number {
    return this.horasTrabajadas.reduce((total, hora) => total + hora.horas, 0);
  }

  // ==========================================
  // HORAS DE UN PROFESOR
  // ==========================================
  getHorasByProfesor(profesorId: number): HoraTrabajada[] {
    return this.horasTrabajadas.filter(hora => hora.profesorId === profesorId);
  }

  // ==========================================
  // TOTAL HORAS DE UN PROFESOR
  // ==========================================
  getTotalHorasByProfesor(profesorId: number): number {
    return this.horasTrabajadas
       .filter(hora => hora.profesorId === profesorId)
       .reduce((total, hora) => total + hora.horas, 0);
  }

  // ==========================================
  // HORAS DE UN PROFESOR EN UN PERÍODO
  // ==========================================
  getHorasByProfesorYPeriodo(profesorId: number, año: number, mes: number): HoraTrabajada[] {
    return this.horasTrabajadas.filter(hora => {

      const fecha = new Date(hora.fecha);

      return (hora.profesorId === profesorId && fecha.getFullYear() === año && fecha.getMonth() + 1 === mes);
    });
    //.reduce((total, hora) => total + hora.horas, 0);
  }

  // ==========================================
  // TOTAL HORAS DE UN PROFESOR EN UN PERÍODO
  // ==========================================
  getTotalHorasByProfesorYPeriodo(profesorId: number, año: number, mes: number): number {

    return this.getHorasByProfesorYPeriodo(profesorId, año, mes).reduce((total, hora) => total + hora.horas, 0);
  }

  // ==========================================
  // AGREGAR HORAS
  // ==========================================
  agregarHora(hora: HoraTrabajada): void {
    console.log('AGREGANDO HORA: ', hora);
    
    this.horasTrabajadas.push(hora);
  }

  // ==========================================
  // EDITAR HORAS
  // ==========================================
  editarHora(horaActualizada: HoraTrabajada): void {
    const indice = this.horasTrabajadas.findIndex(hora => hora.id === horaActualizada.id);

    if (indice === -1) {
      console.log('No se encontró la hora: ', horaActualizada.id);
      return;
    }

    this.horasTrabajadas[indice] = horaActualizada;

    console.log('HORA ACTUALIZADA: ', horaActualizada);
  }

  // ==========================================
  // ELIMINAR HORAS
  // ==========================================
  eliminarHora(id: number): void {
    this.horasTrabajadas = this.horasTrabajadas.filter(hora => hora.id !== id);
  }

  // ==========================================
  // MONTO TOTAL DE UN PROFESOR
  // ==========================================
  getTotalAPagarByProfesor(profesorId: number): number {

    const profesor = this.profesorService.getProfesorById(profesorId);

    if (!profesor) {
      return 0;
    }

    const totalHoras = this.getTotalHorasByProfesor(profesorId);

    return totalHoras * profesor.valorHora;
  }

  // ==========================================
  // MONTO DE UN PROFESOR EN UN PERÍODO
  // ==========================================
  getTotalAPagarByProfesorYPeriodo(profesorId: number, año: number, mes: number): number {

    const profesor = this.profesorService.getProfesorById(profesorId);

    if (!profesor) {
      return 0;
    }

    const totalHoras = this.getTotalHorasByProfesorYPeriodo(profesorId, año, mes);

    return totalHoras * profesor.valorHora;
  }
}
