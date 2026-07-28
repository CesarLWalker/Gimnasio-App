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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesPageRoutingModule {}
