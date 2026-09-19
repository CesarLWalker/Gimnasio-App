import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorasTrabajadasPage } from './horas-trabajadas.page';
import { RegistrarHorasComponent } from './registrar-horas/registrar-horas.component';

const routes: Routes = [
  {
    path: '',
    component: HorasTrabajadasPage
  },
  {
    path: 'registrar-horas',
    component: RegistrarHorasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorasTrabajadasPageRoutingModule {}
