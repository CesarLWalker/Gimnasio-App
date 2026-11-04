import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent,  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonList, IonCheckbox, IonIcon, IonListHeader } from "@ionic/angular/standalone";
import { EjercicioRutina } from 'src/app/models/ejercicioRutina.model';
import { Rutina } from 'src/app/models/rutina.model';
import { RutinasService } from 'src/app/services/rutinas.service';

@Component({
  selector: 'app-crear-rutina',
  standalone: true,
  templateUrl: './crear-rutina.page.html',
  styleUrls: ['./crear-rutina.page.scss'],
  imports: [IonListHeader,  CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
   IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonSelect,
    IonSelectOption, IonButton, IonList, IonCheckbox, IonIcon],
})
export class CrearRutinaPage implements OnInit {

  nombre = '';
  descripcion = '';
  diasPorSemana = 3;
  diasDisponibles = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  diasSeleccionados: string[] = [];

  musculos = ['Pecho', 'Espalda', 'Hombros', 'Piernas', 'Bíceps', 'Tríceps', 'Abdominales', 'Glúteos', 'Antebrazos'];

  ejerciciosPorMusculo: { [key: string]: string[] } = {
    Pecho: [
      'Press de banca plano', 'Press inclinado', 'Aperturas plano', 'Aperturas inclinado', 'Press declinado', 'Aperturas declinado', 'Cruces en polea', 'Mariposa', 
      'Pull Over', 'Press plano mancuernas', 'Press inclinado mancuernas'
    ],
    Espalda: [
      'Dominadas', 'Dominadas asistidas', 'Dorsalera supino', 'Dorsalera prono', 'Dorsalera neutro', 'Remo polea baja', 'Remo barra supino', 'Remo barra prono',
      'Remo mancuernas', 'Peso muerto', 'Hipertensión lumbar', 'Remo palanca', 'Pull Over polea'
    ],
    Hombros: [
      'Press hombros máquina', 'Press hombros mancuernas', 'Vuelos laterales', 'Vuelos laterales 1 brazo polea', 'Vuelos completos', 'Vuelos sentado', 'Posterior 1 brazo polea',
      'Encogimientos de hombros', 'Remo boca', 'Remo boca polea', 'Posterior en polea', 'Posterior mancuernas banco inclinado', 'Posterior en mariposa',
    ],
    Piernas: [
      'Sentadilla barra', 'Sentadilla globet', 'Sentadilla sumo', 'Prensa 45º', 'Prensa 90º', 'Prensa autito(nueva)', 'Prensa a 1 pierna', 'Camilla cuadriceps',
      'Camilla cuadriceps 1 pierna', 'Prensa 1 pierna', 'Camilla biceps femoral', 'Camilla biceps femoral 1 pierna', 'Femoral sentado', 'Femoral parado', 'Pantorrilla sentado',
      'Pantorrilla parado', 'Pantorrilla en multipower', 'Peso muerto', 'Peso muerto 1 pierna', 'Pantorrilla 1 pierna', 'Estocadas', 'Búlgaras'
    ],
    Biceps: [
      'Curl con barra', 'Curl sentado mancuernas', 'Curl alternado parado', 'Concentrado', 'Parado 1 polea'
    ],
    Triceps: [
      'Extensión en polea', 'Press francés parado', 'Press francés sentado', 'Francés polea', 'Francés 1 polea', 'Empuje', 'Rompecráneo', 
      'Lagartijas invertidas', 'Lagartijas en asistidas', 'Patada de burro polea', 'Patada de burro 1 mancuerna', 'Fondos paralelas', 'Fondos en asistidas'
    ],
    Abdominales: [
      'Crunch', 'Reverse crunch', 'Elevación piernas 45º', 'Plancha', 'Bicho muerto alterno', 'Bicho muerto',
      'Rodillas al pecho', 'Cruzados', 'Twister'
    ],
    Glúteos: [
      'Hip thrust', 'Patada de glúteo', 'Abducción de cadera', 'Abductor', 'Aductor', 'Glúteo máquina patada', 'Glúteo subido al cajón 1 pierna'
    ],
    Antebrazos: [
      'Curl Martillo', 'Martillo inverso barra'
    ],
  };

  musculoSeleccionado = '';
  nombreEjercicio = '';
  series = 4;
  repeticiones = '';

  ejercicios: EjercicioRutina[] = [];

  constructor(private rutinasService: RutinasService) { }

  ngOnInit() {
  }

  seleccionarMusculo(musculo: string): void {
    this.musculoSeleccionado = musculo;
  }

  agregarDia(dia: string, seleccionado: boolean): void {
    if (seleccionado && !this.diasSeleccionados.includes(dia)) {
      this.diasSeleccionados.push(dia);
    } else if (!seleccionado) {
      this.diasSeleccionados =
        this.diasSeleccionados.filter(d => d !== dia);
    }
  }

  agregarEjercicio(): void {
    const nombre = this.nombreEjercicio.trim();
    const repeticiones = this.repeticiones.trim();

    if (!nombre || !repeticiones || this.series < 1) {
      alert('Completá el ejercicio, las series y las repeticiones.');
      return;
    }

    this.ejercicios.push({
      nombre,
      series: this.series,
      repeticiones,
      orden: this.ejercicios.length + 1
    });

    this.nombreEjercicio = '';
    this.series = 4;
    this.repeticiones = '';
  }

  eliminarEjercicio(indice: number): void {
    this.ejercicios.splice(indice, 1);

    this.ejercicios = this.ejercicios.map((ejercicio, index) => ({
      ...ejercicio,
      orden: index + 1
    }));
  }

  guardarRutina(): void {
    if (!this.nombre.trim()) {
      alert('Ingresá el nombre de la rutina.');
      return;
    }

    if (this.diasSeleccionados.length === 0) {
      alert('Seleccioná los días de entrenamiento.');
      return;
    }

    if (this.ejercicios.length === 0) {
      alert('Agregá al menos un ejercicio.');
      return;
    }

    const rutina: Rutina = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
      diasEntrenamiento: this.diasSeleccionados,
      diasPorSemana: this.diasPorSemana,
      ejercicios: this.ejercicios
    };

    this.rutinasService.crear(rutina).subscribe({
      next: () => {
        alert('¡Rutina guardada correctamente!');

        this.nombre = '';
        this.descripcion = '';
        this.diasSeleccionados = [];
        this.ejercicios = [];
        this.diasPorSemana = 3;
      },
      error: (error) => {
        console.error('Error al guardar la rutina:', error);
        alert('No se pudo guardar la rutina.');
      }
    });
  }
}
