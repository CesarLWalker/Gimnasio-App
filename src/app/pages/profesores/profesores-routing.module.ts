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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesoresPageRoutingModule {}
