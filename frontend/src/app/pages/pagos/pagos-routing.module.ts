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
    loadComponent: () => import('./nuevo-pago/nuevo-pago.page').then( m => m.NuevoPagoPage)
  },
  { // ruta para editar
    path: 'nuevo-pago/:id',
    loadComponent: () => import('./nuevo-pago/nuevo-pago.page').then(m => m.NuevoPagoPage)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosPageRoutingModule {}
