import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiquidacionesPageRoutingModule } from './liquidaciones-routing.module';

import { LiquidacionesPage } from './liquidaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiquidacionesPageRoutingModule,
    LiquidacionesPage
  ]
})
export class LiquidacionesPageModule {}
