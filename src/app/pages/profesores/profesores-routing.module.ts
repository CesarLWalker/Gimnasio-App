import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfesoresPage } from './profesores.page';
import { NuevoProfesorComponent } from './nuevo-profesor/nuevo-profesor.component';
import { DetalleProfesorPage } from './detalle-profesor/detalle-profesor.page';
import { LiquidacionesPage } from './liquidaciones/liquidaciones.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesoresPage
  },
  { // ruta para crear profesor
    path: 'nuevo-profesor',
    component: NuevoProfesorComponent
  },
  { // ruta para editar profesor
    path: 'nuevo-profesor/:id',
    component: NuevoProfesorComponent
  },
  { // Detalle de un profesor
    path: 'detalle-profesor/:id',
    component: DetalleProfesorPage
  },
   // Historial de cobros de un Profesor
  {
    path: ':id/liquidaciones',
    component: LiquidacionesPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesoresPageRoutingModule {}
