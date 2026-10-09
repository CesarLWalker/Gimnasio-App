import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorasTrabajadasPageRoutingModule } from './horas-trabajadas-routing.module';

import { HorasTrabajadasPage } from './horas-trabajadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorasTrabajadasPageRoutingModule,
    HorasTrabajadasPage
  ],
  declarations: []
})
export class HorasTrabajadasPageModule {}
