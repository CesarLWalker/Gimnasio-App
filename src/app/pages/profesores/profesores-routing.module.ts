import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorPage } from './profesores.page';
import { NuevoProfesorComponent } from './nuevo-profesor/nuevo-profesor.component';

const routes: Routes = [
  {
    path: '',
    component: ProfesorPage
  },
  {
    path: 'nuevo-profesor',
    component: NuevoProfesorComponent
  },  {
    path: 'detalle-profesor',
    loadChildren: () => import('./detalle-profesor/detalle-profesor.module').then( m => m.DetalleProfesorPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesoresPageRoutingModule {}
