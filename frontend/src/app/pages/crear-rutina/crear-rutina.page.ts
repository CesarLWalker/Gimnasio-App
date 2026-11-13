import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonList, IonCheckbox, IonIcon, IonListHeader, IonSegment, IonSegmentButton, IonCardSubtitle } from "@ionic/angular/standalone";
import { DiaRutina } from 'src/app/models/diaRutina';
import { EjercicioRutina } from 'src/app/models/ejercicioRutina.model';
import { Rutina } from 'src/app/models/rutina.model';
import { SemanaRutina } from 'src/app/models/semanaRutina';
import { RutinasService } from 'src/app/services/rutinas.service';

@Component({
  selector: 'app-crear-rutina',
  standalone: true,
  templateUrl: './crear-rutina.page.html',
  styleUrls: ['./crear-rutina.page.scss'],
  imports: [IonCardSubtitle, IonSegmentButton, IonListHeader, CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonSelect,
    IonSelectOption, IonButton, IonList, IonCheckbox, IonIcon, IonSegment]
})
export class CrearRutinaPage implements OnInit {

  nombre = '';
  descripcion = '';
  cantidadSemanas = 1;
  semanas: SemanaRutina[] = [];
  semanaSeleccionada = 0;
  diaSeleccionado = 0;

  musculoSeleccionado = '';
  nombreEjercicio = '';
  series = 4;
  repeticiones = '';

  musculos = ['Calentamiento', 'Pecho', 'Espalda', 'Hombros', 'Piernas', 'Bíceps', 'Tríceps', 'Abdominales', 'Glúteos', 'Antebrazos'];

  ejerciciosPorMusculo: { [key: string]: string[] } = {
    Calentamiento: [
      'Crunch', 'Cruzados', 'Rodillas al pecho', 'Bisagra', 'Twuister', 'Elevación caderas', 'Flexiones de brazos', 'Elevación piernas 45º',
      'Espinales', 'Reverse crunch', 'Bisagra 1 pierna'
    ],
    Pecho: [
      'Press de banca plano', 'Press inclinado', 'Aperturas plano', 'Aperturas inclinado', 'Press declinado', 'Aperturas declinado', 'Cruces (Apertura) en polea', 'Mariposa',
      'Pull Over', 'Press plano mancuernas', 'Press inclinado mancuernas', 'Pecho máquina', 'Plano multipower', 'Inclinado multipower'
    ],
    Espalda: [
      'Dominadas', 'Dominadas asistidas', 'Dorsalera supino', 'Dorsalera prono', 'Dorsalera neutro', 'Remo polea baja', 'Remo barra supino', 'Remo barra prono',
      'Remo mancuernas', 'Peso muerto', 'Hipertensión lumbar', 'Remo palanca', 'Pull Over polea'
    ],
    Hombros: [
      'Press hombros máquina', 'Press hombros mancuernas', 'Vuelos laterales', 'Vuelos laterales 1 brazo polea', 'Vuelos completos', 'Vuelos sentado', 'Posterior 1 brazo polea',
      'Encogimientos de hombros', 'Remo boca', 'Remo boca polea', 'Posterior en polea', 'Posterior mancuernas banco inclinado', 'Posterior en mariposa', 'Vuelos combinados',
      'Elevación frente polea entrepiernas'
    ],
    Piernas: [
      'Sentadilla barra', 'Sentadilla globet', 'Sentadilla sumo', 'Prensa 45º', 'Prensa 90º', 'Prensa autito(nueva)', 'Prensa a 1 pierna', 'Camilla cuadriceps',
      'Camilla cuadriceps 1 pierna', 'Prensa 1 pierna', 'Camilla biceps femoral', 'Camilla biceps femoral 1 pierna', 'Femoral sentado', 'Femoral parado', 'Pantorrilla sentado',
      'Pantorrilla parado', 'Pantorrilla en multipower', 'Peso muerto', 'Peso muerto 1 pierna', 'Pantorrilla 1 pierna', 'Estocadas', 'Búlgaras', 'Estocadas atrás',
      'Sentadilla Hack frente', 'Sentadilla Hack espalda', 'Subida al cajón'
    ],
    Bíceps: [
      'Curl con barra', 'Curl sentado mancuernas', 'Curl alternado parado', 'Concentrado', 'Parado 1 polea', 'Biceps Scott', 'Parado 2 brazos polea enfrentadas'
    ],
    Tríceps: [
      'Extensión en polea', 'Press francés parado', 'Press francés sentado', 'Francés polea', 'Francés 1 polea', 'Empuje', 'Rompecráneo',
      'Lagartijas invertidas', 'Lagartijas en asistidas', 'Patada de burro polea', 'Patada de burro 1 mancuerna', 'Fondos paralelas', 'Fondos en asistidas'
    ],
    Abdominales: [
      'Crunch', 'Reverse crunch', 'Elevación piernas 45º', 'Plancha', 'Bicho muerto alterno', 'Bicho muerto',
      'Rodillas al pecho', 'Cruzados', 'Twister', 'Disco techo', 'Bisagra'
    ],
    Glúteos: [
      'Hip thrust', 'Patada de glúteo', 'Abducción de cadera', 'Abductor', 'Aductor', 'Glúteo máquina patada', 'Glúteo subido al cajón 1 pierna'
    ],
    Antebrazos: [
      'Curl Martillo', 'Martillo inverso barra', 'Extensor', 'Flexor', 'Martillo en polea', 'Concentrado punta martillo'
    ],
  };

  constructor(private rutinasService: RutinasService) { }

  ngOnInit(): void {
    this.generarSemanas();
  }

  // Generar tres días automáticamente por cada semana
  generarSemanas(): void {
    this.semanas = [];

    for (let i = 1; i <= this.cantidadSemanas; i++) {
      const dias: DiaRutina[] = [];

      for (let j = 1; j <= 3; j++) {
        dias.push({
          numeroDia: j,
          nombre: `Día ${j}`,
          grupoMuscular: '',
          ejercicios: []
        });
      }

      this.semanas.push({numeroSemana: i, dias});
    }

    this.semanaSeleccionada = 0;
    this.diaSeleccionado = 0;
    this.musculoSeleccionado = '';
  }

  // Acceso a la semana seleccionada
  get semanaActual(): SemanaRutina | undefined {
    return this.semanas[this.semanaSeleccionada];
  }

  // Acceso al día seleccionado
  get diaActual(): DiaRutina | undefined {
    return this.semanaActual?.dias[this.diaSeleccionado];
  }

  // Seleccionar semana
  seleccionarSemana(indice: number): void {
    this.semanaSeleccionada = indice;
    this.diaSeleccionado = 0;
    this.musculoSeleccionado = this.diaActual?.grupoMuscular ?? '';
  }

  // Seleccionar día
  seleccionarDia(indice: number): void {
    this.diaSeleccionado = indice;
    this.musculoSeleccionado = this.diaActual?.grupoMuscular ?? '';
  }

  // Cambiar grupo muscular del día
  seleccionarMusculo(musculo: string): void {
    if (!this.diaActual) return;

    this.musculoSeleccionado = musculo;
    this.diaActual.grupoMuscular = musculo;
  }

  // Agregar ejercicio al día seleccionado
  agregarEjercicio(): void {
    const nombre = this.nombreEjercicio.trim();
    const reps = this.repeticiones.trim();

    if (!this.diaActual) {
      alert('Seleccioná un día.');
      return;
    }

    if (!this.diaActual.grupoMuscular) {
      alert('Primero seleccioná un grupo muscular.');
      return;
    }

    if (!nombre || !reps || this.series < 1) {
      alert('Completá el nombre, las series y las repeticiones.');
      return;
    }

    this.diaActual.ejercicios.push({
      nombre,
      series: Number(this.series),
      repeticiones: reps,
      orden: this.diaActual.ejercicios.length + 1
    });

    this.nombreEjercicio = '';
    this.series = 4;
    this.repeticiones = '';
  }

  // Eliminar ejercicio del día seleccionado
  eliminarEjercicio(indice: number): void {
    if (!this.diaActual) return;

   this.diaActual.ejercicios.splice(indice, 1);

   this.diaActual.ejercicios.forEach((ejercicio, i) => {
    ejercicio.orden = i + 1;
   });
  }

  // Guardar rutina completa en MySQL
  guardarRutina(): void {
    if (!this.nombre.trim()) {
      alert('Ingresá el nombre de la rutina.');
      return;
    }

    const diaIncompleto = this.semanas.some(semana =>
      semana.dias.some(dia => !dia.grupoMuscular.trim() || dia.ejercicios.length === 0)
    );

    if (diaIncompleto) {
      alert('Todos los días deben tener un grupo muscular y al menos un ejercicio.');
      return;
    }

    const rutina: Rutina = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      semanas: this.semanas
    };

    this.rutinasService.crear(rutina).subscribe({next: () => {
      alert('¡Rutina guardada correctamente!');

      this.nombre = '';
      this.descripcion = '';
      this.cantidadSemanas = 1;
      this.generarSemanas();
    },
  error: error => {
    console.error('Error al guardar la rutina:', error);
    alert('No se pudo guardar la rutina.');
  }
  });

  }
}
