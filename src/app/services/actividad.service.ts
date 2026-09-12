import { Injectable } from "@angular/core";
import { ActividadReciente } from "../models/actividadReciente.model";

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private actividades: ActividadReciente[] = [];

  public getActividades(): ActividadReciente[] {
    return [...this.actividades];
  }

  public agregarActividad(actividad: ActividadReciente): void {
    this.actividades.unshift(actividad);
  }
}