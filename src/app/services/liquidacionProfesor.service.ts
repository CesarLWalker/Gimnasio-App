import { LiquidacionProfesor } from './../models/liquidacionProfesor.model';
import { Injectable } from "@angular/core";
import { ProfesorService } from './profesor.service';
import { HoraTrabajadaService } from './horaTrabajada.service';
import { EstadoLiquidacion } from '../enums/estadoLiquidacion.enum';
import { TipoRemuneracion } from '../enums/tipoRemuneracion.enum';

@Injectable({
  providedIn: 'root'
})
export class LiquidacionProfesorService {

  private liquidaciones: LiquidacionProfesor[] = [];

  constructor(
    private profesorService: ProfesorService,
    private horaTrabajadaService: HoraTrabajadaService
  ) {}

  getLiquidaciones(): LiquidacionProfesor[] {
    return this.liquidaciones;
  }

  getLiquidacionesByProfesor(profesorId: number): LiquidacionProfesor[] {
    return this.liquidaciones.filter(liquidacion => liquidacion.profesorId === profesorId);
  }

  generarLiquidacion(profesorId: number, periodo: string, año: number, mes: number): LiquidacionProfesor | undefined {
    const profesor = this.profesorService.getPofesorById(profesorId);

    if (!profesor) {
      return undefined;
    }

    const yaExiste = this.liquidaciones.some(liquidacion => liquidacion.profesorId === profesorId && liquidacion.periodo === periodo);

    if (yaExiste) {
      return undefined;
    }

    let horas = 0;
    let totalPagar = 0;

    if (profesor.tipoRemuneracion === TipoRemuneracion.POR_HORA) {

      horas = this.horaTrabajadaService.getTotalHorasByProfesorYPeriodo(profesorId, año, mes);

      totalPagar = horas * profesor.valorHora;
    } else if (profesor.tipoRemuneracion === TipoRemuneracion.SUELDO_FIJO) {

      totalPagar = profesor.sueldo;
    }

    const liquidacion: LiquidacionProfesor = {

      id: this.liquidaciones.length + 1,
      profesorId: profesorId,
      periodo: periodo,
      totalHoras: horas,
      valorHora: profesor.valorHora,
      tipoRemuneracion: profesor.tipoRemuneracion,
      totalPagar: totalPagar,
      estado: EstadoLiquidacion.PENDIENTE,
      fechaLiquidacion: new Date().toISOString().split('T')[0]
    };

    this.liquidaciones.push(liquidacion);
    return liquidacion;
  }

  marcarComoPagado(id: number): void {
    const liquidacion = this.liquidaciones.find(liquidacion => liquidacion.id === id);

    if (liquidacion) {
      liquidacion.estado = EstadoLiquidacion.PAGADO;
    }
  }
}
