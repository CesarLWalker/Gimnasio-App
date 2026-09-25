import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  // ID DE LA HORA QUE ESTAMOS EDITANDO
  horaId: number | null = null;

  // INDICA SI ESTAMOS EDITANDO
  modoEdicion: boolean = false;

  // DATOS DEL FORMULARIO
  profesorId: number = 0;
  fecha: string = '';
  horaInicio: string = '';
  horaFin: string = '';
  actividad: string = '';
  observacion: string = '';

  // HORAS CALCULADAS
  horas: number = 0;

  // DATOS DEL PAGO
  valorHora: number = 0;
  montoGenerado: number = 0;

  constructor(
    private horaTrabajadaService: HoraTrabajadaService,
    private profesorService: ProfesorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Cargamos los profesores
    this.profesores = this.profesorService.getProfesores();
   
     // Buscamos si la URL tiene un ID
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      // Estamos editando
      this.horaId = Number(id);
      this.modoEdicion = true;

      this.cargarHoraParaEditar();

    } else {
      // Estamos creando una nueva hora
      this.cargarFechaActual();
    }
  }

  // =========================================================
  // FECHA ACTUAL
  // =========================================================
  private cargarFechaActual(): void {

    const hoy = new Date();

    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');

    this.fecha = `${año}-${mes}-${dia}`;
  }

  // =========================================================
  // CARGAR HORA PARA EDITAR
  // =========================================================

  private cargarHoraParaEditar(): void {

    if (this.horaId === null) {
      return;
    }

    const hora = this.horaTrabajadaService.getHorasById(this.horaId);

    if (!hora) {

      console.log('No se encontró la hora con ID:', this.horaId);

      this.router.navigate(['/horas-trabajadas']);

      return;
    }

    // Cargamos los datos existentes
    this.profesorId = hora.profesorId;
    this.fecha = hora.fecha;
    this.horaInicio = hora.horaInicio;
    this.horaFin = hora.horaFin;
    this.horas = hora.horas;
    this.valorHora = hora.valorHora;
    this.actividad = hora.actividad;
    this.observacion = hora.observacion ?? '';

    // Recalculamos el monto con el valor hora guardado
    this.calcularMonto();

    // Recalculamos las horas por seguridad
    this.calcularHoras();
  }

  // =========================================================
  // SELECCIONAR PROFESOR
  // =========================================================
  seleccionarProfesor(): void {

    const profesor = this.profesores.find(p => p.id === this.profesorId);

    if (!profesor) {
      this.valorHora = 0;
      this.montoGenerado = 0;
      return;
    }

    this.valorHora = profesor.valorHora;
    this.calcularMonto();
  }

  // =========================================================
  // CALCULAR HORAS
  // =========================================================
  calcularHoras(): void {

    if (!this.horaInicio || !this.horaFin) {
      this.horas = 0;
      this.montoGenerado = 0;
      return;
    }

    const inicio = this.convertirMinutos(this.horaInicio);
    const fin = this.convertirMinutos(this.horaFin);

    if (fin <= inicio) {
      this.horas = 0;
      this.montoGenerado = 0;
      return;
    }

    const diferencia = fin - inicio;
    this.horas = diferencia / 60;
    this.calcularMonto();
  }

  // =========================================================
  // CALCULAR MONTO
  // =========================================================
  calcularMonto(): void {
    this.montoGenerado = this.horas * this.valorHora;
  }

  // =========================================================
  // CONVERTIR HORA A MINUTOS
  // =========================================================
  private convertirMinutos(hora: string): number {

    const [horas, minutos] = hora.split(':').map(Number);
    return horas * 60 + minutos;
  }

  // =========================================================
  // GUARDAR
  // =========================================================
  guardarHora(): void {
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
    // =====================================================
    // MODO EDICIÓN
    // =====================================================

    if (this.modoEdicion && this.horaId !== null) {

      const horaActualizada: HoraTrabajada = {

        id: this.horaId,
        profesorId: this.profesorId,
        fecha: this.fecha,
        horaInicio: this.horaInicio,
        horaFin: this.horaFin,
        horas: this.horas,
        valorHora: this.valorHora,
        actividad: this.actividad,
        observacion: this.observacion || undefined
      };

      this.horaTrabajadaService.editarHora(horaActualizada);

      console.log('Hora actualizada:', horaActualizada);

      console.log('Valor por hora:', this.valorHora);

      console.log('Monto generado:', this.montoGenerado);
    } 
    // =====================================================
    // MODO NUEVO
    // =====================================================

    else {

      const nuevaHora: HoraTrabajada = {

        id: this.generarNuevoId(),
        profesorId: this.profesorId,
        fecha: this.fecha,
        horaInicio: this.horaInicio,
        horaFin: this.horaFin,
        horas: this.horas,
        valorHora: this.valorHora,
        actividad: this.actividad,
        observacion: this.observacion || undefined
      };

      this.horaTrabajadaService.agregarHora(nuevaHora);

      console.log('Horas registradas:', nuevaHora);

      console.log('Valor por hora:', this.valorHora);

      console.log('Monto generado:', this.montoGenerado);
    }

    // Volvemos a Horas Trabajadas 
    this.router.navigate(['/horas-trabajadas']);
  }

  // =========================================================
  // GENERAR ID
  // =========================================================
  private generarNuevoId(): number {
    const horas = this.horaTrabajadaService.getHorasTrabajadas();

    if (horas.length === 0) {
      return 1;
    }

    return Math.max(...horas.map(hora => hora.id)) + 1;
  }

}
