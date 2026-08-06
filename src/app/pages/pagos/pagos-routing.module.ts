import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagosPage } from './pagos.page';

const routes: Routes = [
  {
    path: '',
    component: PagosPage
  },
  { // ruta para crear
    path: 'nuevo-pago',
    loadChildren: () => import('./nuevo-pago/nuevo-pago.module').then( m => m.NuevoPagoPageModule)
  },
  { // ruta para editar
    path: 'nuevo-pago/:id',
    loadChildren: () => import('./nuevo-pago/nuevo-pago.module').then(m => m.NuevoPagoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosPageRoutingModule {}
