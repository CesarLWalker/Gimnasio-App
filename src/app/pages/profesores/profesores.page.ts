import { ProfesorService } from './../../services/profesor.service';
import { Profesor } from 'src/app/models/profesor.model'
import { Component, effect, OnInit } from '@angular/core';
import { IonSelect, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonLabel, IonItem, IonInput, IonButton, IonFab, IonFabButton, IonIcon, IonList } from "@ionic/angular/standalone";
import { TipoRemuneracion } from 'src/app/enums/tipoRemuneracion.enum';
import { EstadoProfesor } from 'src/app/enums/estadoProfesor.enum';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LiquidacionProfesorService } from 'src/app/services/liquidacionProfesor.service';

@Component({
  selector: 'app-profesores',
  standalone: true,
  templateUrl: './profesores.page.html',
  styleUrls: ['./profesores.page.scss'],
  imports: [IonList, IonIcon, IonFabButton, IonFab, FormsModule, IonButton, IonInput, IonItem, IonLabel, IonCardContent, IonCardHeader, IonCard, IonCol, IonRow,
    IonGrid, IonCardTitle, IonContent, IonTitle, IonToolbar, IonHeader, IonSelect, IonSearchbar],
})
export class ProfesoresPage implements OnInit {

 profesores: Profesor[] = [];

 // Lista que mostramos en pantalla
 profesoresFiltrados: Profesor[] = [];

 // Texto del buscador
 searchTerm = '';

 // Estado seleccionado para filtrar
 estadoFiltro: string = 'TODOS';

 profesorEditandoId: number | null = null; // Profesor que se está editando

 icono = '👨‍🏫';
 nombre = '';
 celular = '';
 especialidad = '';
 sueldo = 0;
 valorHora = 0;

 tipoRemuneracion: TipoRemuneracion = TipoRemuneracion.POR_HORA;
 estado: EstadoProfesor = EstadoProfesor.ACTIVO;
 color = 'primary';
 TipoRemuneracion = TipoRemuneracion;
 EstadoProfesor = EstadoProfesor;

  constructor(
    private profesorService: ProfesorService,
    private liquidacionProfesorService: LiquidacionProfesorService,
    private router: Router,
    private alertController: AlertController
  ) {
    effect(() => {
      this.profesorService.profesoresChanged();
      this.cargarProfesores();
    });
  }

  private cargarProfesores(): void {
    this.profesores = this.profesorService.getProfesores();
    this.filterProfesores();
  }

  ngOnInit(): void {}

  // Normaliza el texto para que la búsqueda ignore mayúsculas, minúsculas y acentos
  //
  public normalizeText(text: string): string {
    return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
  }

   public getEstadoLabel(estado: string): string {

      switch (estado) {
      case EstadoProfesor.ACTIVO:
        return '🟢 Activo';

      case EstadoProfesor.INACTIVO:
        return '🔴 Inactivo';

      default:
        return estado; // 🟡
      }
    }

    //  Métodos públicos

    // Obtener el último cobro
    public getUltimoCobro(profesorId: number): string {

      const liquidaciones = this.liquidacionProfesorService.getLiquidacionesByProfesor(profesorId);

      if (liquidaciones.length === 0) {
        return 'Sin cobros registrados';
      }

      const ultimaLiquidacion = liquidaciones.filter(liquidacion => liquidacion.fechaLiquidacion)
       .sort((a, b) => new Date(b.fechaLiquidacion!).getTime() - new Date(a.fechaLiquidacion!).getTime())[0];

       if (!ultimaLiquidacion?.fechaLiquidacion) {
        return 'Sin cobros registrados';
       }

       const [año, mes, dia] = ultimaLiquidacion.fechaLiquidacion.split('-');

       return `${dia}/${mes}/${año}`;
    }

    // Busca por nombre y aplica el filtro de estado
    public filterProfesores(): void {

      const search = this.normalizeText(this.searchTerm);

      this.profesoresFiltrados = this.profesores.filter(profesor => {

        // Filtro por nombre
        const coincideNombre = !search || this.normalizeText(profesor.nombre).includes(search);

        // Filtro por estado
        const coincideEstado = this.estadoFiltro === 'TODOS' || profesor.estado === this.estadoFiltro;

        return coincideNombre && coincideEstado;
      });
    }

    // Cambia el filtro de estado
    public filtrarPorEstado(estado: string): void {
      this.estadoFiltro = estado;
      this.filterProfesores();
    }

    public goToNuevoProfesor(): void {
      //console.log("Botón + presionado");
      this.router.navigate(['/profesores/nuevo-profesor']);
    }

    public verDetalleProfesor(profesor: Profesor): void {
      this.router.navigate(['/profesores/detalle-profesor', profesor.id]);
    }

    public editarProfesor(profesor: Profesor): void {
      //console.log("Editar profesor: ", profesor);
      this.router.navigate(['/profesores/nuevo-profesor', profesor.id]);
    }

    public verHistorialCobros(profesor: Profesor): void {
      this.router.navigate(['/profesores', profesor.id, 'historial-cobros']);
    }

    public async eliminarProfesor(profesor: Profesor): Promise<void> {

      const alert = await this.alertController.create({
        header: 'Eliminar profesor',
        message: `¿Estás seguro que desea eliminar a ${profesor.nombre}?`, // comillas invertidas (backticks)
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: () => {
              this.profesorService.deleteProfesor(profesor.id);
            }
          }
        ]
      });

      await alert.present();
      console.log("Profesor eliminado: ", profesor);
    }
}
