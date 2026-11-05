import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleProfesorPage } from './detalle-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleProfesorPageRoutingModule {}
