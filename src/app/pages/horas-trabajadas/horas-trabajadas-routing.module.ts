import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorasTrabajadasPage } from './horas-trabajadas.page';

const routes: Routes = [
  {
    path: '',
    component: HorasTrabajadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorasTrabajadasPageRoutingModule {}
