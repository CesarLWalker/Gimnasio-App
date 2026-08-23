import { Component, OnInit } from '@angular/core';
import { LiquidacionProfesor } from 'src/app/models/liquidacionProfesor.model';
import { Profesor } from 'src/app/models/profesor.model';
import { LiquidacionProfesorService } from 'src/app/services/liquidacionProfesor.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonGrid, IonButton, IonRow, IonCol, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonBadge } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liquidaciones',
  standalone: true,
  templateUrl: './liquidaciones.page.html',
  styleUrls: ['./liquidaciones.page.scss'],
  imports: [ FormsModule, IonBadge, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonCol, IonRow, IonButton, IonGrid, IonLabel, IonItem, IonContent, IonTitle, IonHeader, IonToolbar, IonSelect, IonSelectOption],
})
export class LiquidacionesPage implements OnInit {

  profesores: Profesor[] = [];

  liquidaciones: LiquidacionProfesor[] = [];

  periodoSeleccionado = this.obtenerPeriodoActual();
  profesorSeleccionadoId: any;

  constructor(
    private profesorService: ProfesorService,
    private liquidacionProfesorService: LiquidacionProfesorService
  ) { }

  ngOnInit() {

    this.profesores = this.profesorService.getProfesores();
    this.liquidaciones = this.liquidacionProfesorService.getLiquidaciones();
  }

  obtenerPeriodoActual(): string {
    const fecha = new Date();

    const meses = [
      'ENERO',
      'FEBRERO',
      'MARZO',
      'ABRIL',
      'MAYO',
      'JUNIO',
      'JULIO',
      'AGOSTO',
      'SETIEMBRE',
      'OCTUBRE',
      'NOVIEMBRE',
      'DICIEMBRE'
    ];

    return `${meses[fecha.getMonth()]} ${fecha.getFullYear()}`;
  }

  generarLiquidacion(): void {

    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;

    const profesorId = this.profesorSeleccionadoId;

    if (profesorId == null) {
       alert('⚠️ Debes seleccionar un profesor.');
      return;
    }

    const liquidacion = this.liquidacionProfesorService.generarLiquidacion(profesorId, this.periodoSeleccionado, año, mes);

    if (liquidacion) {

      this.liquidaciones = this.liquidacionProfesorService.getLiquidaciones();
      alert('✅ Liquidación generada correctamente.');
    } else {
        alert(`⚠️ Ya existe una liquidación para este profesor en ${this.periodoSeleccionado}.`);
    }
  }

  marcarComoPagado(id: number): void {
    this.liquidacionProfesorService.marcarComoPagado(id);
    this.liquidaciones = this.liquidacionProfesorService.getLiquidaciones();
  }
}
