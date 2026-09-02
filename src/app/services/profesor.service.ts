import { Injectable } from "@angular/core";
import { EstadoProfesor } from "../enums/estadoProfesor.enum";
import { Profesor } from "../models/profesor.model";
import { TipoRemuneracion } from "../enums/tipoRemuneracion.enum";

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

   profesores: Profesor[] = [
    {
      id: 1,
      icono: "👨‍🏫",
      nombre: "Profesora A",
      celular: "123456",
      especialidad: "Musculación",
      sueldo: 150000,
      valorHora: 5000,
      tipoRemuneracion: TipoRemuneracion.SUELDO_FIJO,
      estado: EstadoProfesor.ACTIVO,
      color: "gray"
    },
    {
      id: 2,
      icono: "👨‍🏫",
      nombre: "Profesora B",
      celular: "456789",
      especialidad: "Musculación",
      sueldo: 140000,
      valorHora: 5000,
      tipoRemuneracion: TipoRemuneracion.POR_HORA,
      estado: EstadoProfesor.ACTIVO,
      color: "black"
    },
    {
      id: 3,
      icono: "👨‍🏫",
      nombre: "Profesor César Walker",
      celular: "789789",
      especialidad: "Musculación",
      sueldo: 70000,
      valorHora: 5000,
      tipoRemuneracion: TipoRemuneracion.POR_HORA,
      estado: EstadoProfesor.INACTIVO,
      color: "black"
    },
    {
      id: 4,
      icono: "👨‍🏫",
      nombre: "Profesora C",
      celular: "102030",
      especialidad: "Funcional",
      sueldo: 40000,
      valorHora: 5000,
      tipoRemuneracion: TipoRemuneracion.SUELDO_FIJO,
      estado: EstadoProfesor.INACTIVO,
      color: "gray"
    }
  ];

  constructor() {}

  getProfesores(): Profesor[] {
    return this.profesores;
  }

  getPofesorById(id: number): Profesor | undefined {
    return this.profesores.find(profesor => profesor.id === id);
  }

  agregarProfesor(profesor: Profesor): void {
    this.profesores.push(profesor);
  }

  actualizarProfesor(profesorActualizado: Profesor): void {
    const index = this.profesores.findIndex(profesor => profesor.id === profesorActualizado.id);

    if (index !== -1) {
      this.profesores[index] = profesorActualizado;
    }
  }

  eliminarProfesor(id: number): void {
    this.profesores = this.profesores.filter(profesor => profesor.id !== id);
  }

}
