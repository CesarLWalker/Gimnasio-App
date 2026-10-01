import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesPage } from './clientes.page';

const routes: Routes = [
  {
    path: '',
    component: ClientesPage
  },
  { // ruta para crear
    path: 'nuevo-cliente',
    loadChildren: () => import('./nuevo-cliente/nuevo-cliente.module').then( m => m.NuevoClientePageModule)
  },
  { // ruta para editar
    path: 'nuevo-cliente/:id',
    loadChildren: () => import('./nuevo-cliente/nuevo-cliente.module').then(m => m.NuevoClientePageModule)
  },
  { // Detalle de un cliente
    path: 'detalle-cliente/:id',
    loadChildren: () => import('./detalle-cliente/detalle-cliente.module').then( m => m.DetalleClientePageModule)
  },
  { // Historial de pagos de un Cliente
    path: ':id/historial-pagos',
    loadChildren: () => import('./historial-pagos/historial-pagos.module').then( m => m.HistorialPagosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesPageRoutingModule {}
