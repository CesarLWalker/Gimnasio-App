import { Component, OnInit } from '@angular/core';
import { LiquidacionProfesor } from 'src/app/models/liquidacionProfesor.model';
import { Profesor } from 'src/app/models/profesor.model';
import { LiquidacionProfesorService } from 'src/app/services/liquidacionProfesor.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonGrid, IonButton, IonRow, IonCol, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonBadge, ToastController } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { TipoRemuneracion } from 'src/app/enums/tipoRemuneracion.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liquidaciones',
  standalone: true,
  templateUrl: './liquidaciones.page.html',
  styleUrls: ['./liquidaciones.page.scss'],
  imports: [FormsModule, IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonCol, IonRow, IonButton, IonGrid, IonLabel, IonItem, IonContent, IonTitle, IonHeader, IonToolbar, IonSelect, IonSelectOption, IonBadge],
})
export class LiquidacionesPage implements OnInit {

  TipoRemuneracion = TipoRemuneracion;

  profesores: Profesor[] = [];

  liquidaciones: LiquidacionProfesor[] = [];

  liquidacionesFiltradas: LiquidacionProfesor[] = [];

  profesorSeleccionadoId: any;

  profesorIdDesdeRuta: number | null = null;

  profesorActual: Profesor | undefined;

  periodos: {
    nombre: string;
    mes: number;
    año: number;
  }[] = [];

  periodoSeleccionado = {
    nombre: '',
    mes: 0,
    año: 0
  };

  constructor(
    private profesorService: ProfesorService,
    private liquidacionProfesorService: LiquidacionProfesorService,
    private toastController: ToastController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.profesorIdDesdeRuta = Number(id);

      this.profesorActual = this.profesorService.getProfesores().find(profesor => profesor.id === this.profesorIdDesdeRuta);
    }

    this.profesores = this.profesorService.getProfesores();
    this.liquidaciones = this.liquidacionProfesorService.getLiquidaciones();
    this.generarPeriodos();
    this.filtrarLiquidaciones();
  }

  ionViewWillEnter(): void {
    this.liquidaciones = this.liquidacionProfesorService.getLiquidaciones();
    this.filtrarLiquidaciones();
  }

  generarPeriodos(): void {
    const fechaActual = new Date();

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

    this.periodos = [];

    for (let i = 0; i < 6; i++) {
      const fecha = new Date(
        fechaActual.getFullYear(),
        fechaActual.getMonth() - i, // la i permite retroceder mes por mes
        1
      );

      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();

      this.periodos.push({
        nombre: `${meses[fecha.getMonth()]} ${año}`,
        mes: mes,
        año: año
      });
    }

    this.periodoSeleccionado = this.periodos[0];
  }

  async generarLiquidacion(): Promise<void> {

    const profesorId = this.profesorSeleccionadoId;

    if (profesorId == null) {
       await this.mostrarMensaje('⚠️ Debes seleccionar un profesor.', 'warning');
      return;
    }

    const liquidacion = this.liquidacionProfesorService.generarLiquidacion(
      profesorId,
      this.periodoSeleccionado.nombre,
      this.periodoSeleccionado.año,
      this.periodoSeleccionado.mes
    );

    if (liquidacion) {

      this.liquidaciones = this.liquidacionProfesorService.getLiquidaciones();
      this.filtrarLiquidaciones();
      await this.mostrarMensaje('✅ Liquidación generada correctamente.', 'success');
    } else {
      const periodo = this.periodoSeleccionado.nombre;

      const yaExiste = this.liquidaciones.some(liquidacion =>
        liquidacion.profesorId === profesorId && liquidacion.periodo === periodo
      );

      if (yaExiste) {
        await this.mostrarMensaje(`⚠️ Ya existe una liquidación para este profesor en ${periodo}.`, 'danger');
      } else {
        await this.mostrarMensaje(`⚠️ No hay horas trabajadas registradas para este profesor en ${periodo}.`,
      'warning');
      }

    }
  }

  filtrarLiquidaciones(): void {
    this.liquidacionesFiltradas = this.liquidaciones.filter(liquidacion => {

      const coincidePeriodo = liquidacion.periodo === this.periodoSeleccionado.nombre;
      const coincideProfesor = this.profesorIdDesdeRuta === null || liquidacion.profesorId === this.profesorIdDesdeRuta;

      return coincidePeriodo && coincideProfesor;
    });
  }

  marcarComoPagado(id: number): void {
    this.liquidacionProfesorService.marcarComoPagado(id);
    this.liquidaciones = this.liquidacionProfesorService.getLiquidaciones();
    this.filtrarLiquidaciones();
  }

  async mostrarMensaje(mensaje: string, color: 'success' | 'warning' | 'danger'): Promise<void> {

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      position: 'middle',
      color: color
    });

    await toast.present();
  }
}
