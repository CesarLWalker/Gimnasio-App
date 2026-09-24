import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController, IonHeader, IonToolbar, IonTitle, IonContent,  IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { HoraTrabajada } from 'src/app/models/horaTrabajada.model';
import { Profesor } from 'src/app/models/profesor.model';
import { HoraTrabajadaService } from 'src/app/services/horaTrabajada.service';
import { LiquidacionProfesorService } from 'src/app/services/liquidacionProfesor.service';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-horas-trabajadas',
  standalone: true,
  templateUrl: './horas-trabajadas.page.html',
  styleUrls: ['./horas-trabajadas.page.scss'],
  imports: [FormsModule, IonContent, IonTitle, IonHeader, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption,
     IonInput, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, RouterLink ]
})
export class HorasTrabajadasPage implements OnInit {

  profesores: Profesor[] = [];
  horasTrabajadas: HoraTrabajada[] = []; // todas las horas

  profesorSeleccionadoId: number | null = null; // Formulario para registrar una hora

  // Filtros
  profesorFiltroId: number | null = null; // Filtro de la tabla
  horasFiltradas: HoraTrabajada[] = []; // las que mostramos después del filtro
  totalHorasFiltradas = 0;
  totalAPagarFiltrado = 0;

  periodoFiltro = '';

  fecha = '';
  horaInicio = '';
  horaFin = '';
  horas = 0;
  actividad = '';
  observacion = '';

  constructor(
    private profesorService: ProfesorService,
    private horaTrabajadaService: HoraTrabajadaService,
    private liquidacionProfesorService: LiquidacionProfesorService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {

    this.profesores = this.profesorService.getProfesores();
    this.horasTrabajadas = this.horaTrabajadaService.getHorasTrabajadas();

    this.horasFiltradas = this.horasTrabajadas;

    this.calcularTotalHoras();
    this.filtrarHoras();
  }

  ionViewWillEnter(): void {
    this.horasTrabajadas = this.horaTrabajadaService.getHorasTrabajadas();
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

    this.totalAPagarFiltrado = this.horasFiltradas.reduce((total, hora) => total + this.getTotalHora(hora), 0);
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

      id: this.generarNuevoId(),
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

  private generarNuevoId(): number {

    if (this.horasTrabajadas.length === 0) {
      return 1;
    }

    return Math.max(...this.horasTrabajadas.map(hora => hora.id)) + 1;
  }

  getValorHora(profesorId: number): number {

    const profesor = this.profesores.find(profesor => profesor.id === profesorId);

    return profesor?.valorHora ?? 0;
  }

  getTotalHora(hora: HoraTrabajada): number {

    const valorHora = this.getValorHora(hora.profesorId);

    return hora.horas * valorHora;
  }

  async eliminarHora(id: number): Promise<void> {

    const hora = this.horaTrabajadaService.getHorasById(id);

    if (!hora) {
      return;
    }

    const profesor = this.profesores.find(profesor => profesor.id === hora.profesorId);

    const alert = await this.alertController.create({
      header: 'confirmar eliminación',
      message: `¿Querés eliminar las horas registradas de ${profesor?.nombre??'este profesor'} del día ${hora.fecha}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.horaTrabajadaService.eliminarHora(id);
            this.horasTrabajadas = this.horaTrabajadaService.getHorasTrabajadas();
            this.filtrarHoras();
          }
        }
      ]
    });

    await alert.present();
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

  async generarLiquidacion(): Promise<void> {

  if (this.profesorFiltroId === null || !this.periodoFiltro) {
    await this.mostrarMensaje(
      '⚠️ Seleccioná un profesor y un período.',
      'warning'
    );
    return;
  }

  const [año, mes] = this.periodoFiltro.split('-').map(Number);

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

  const periodo = `${meses[mes - 1]} ${año}`;

  const liquidacion = this.liquidacionProfesorService.generarLiquidacion(
    this.profesorFiltroId,
    periodo,
    año,
    mes
  );

  if (liquidacion) {

    await this.mostrarMensaje(
      '✅ Liquidación generada correctamente.',
      'success'
    );

  } else {

    const yaExiste = this.liquidacionProfesorService
      .getLiquidacionesByProfesor(this.profesorFiltroId)
      .some(liquidacion => liquidacion.periodo === periodo);

    if (yaExiste) {

      await this.mostrarMensaje(
        `⚠️ Ya existe una liquidación para ${periodo}.`,
        'danger'
      );

    } else {

       await this.mostrarMensaje(
         `⚠️ No hay horas trabajadas para ${periodo}.`,
         'warning'
       );

      }
    }
  }

  async mostrarMensaje(
  mensaje: string,
  color: 'success' | 'warning' | 'danger'
  ): Promise<void> {

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      position: 'middle',
      color: color
    });

    await toast.present();
  }

}
