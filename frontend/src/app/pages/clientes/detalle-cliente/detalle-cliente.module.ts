import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleClientePageRoutingModule } from './detalle-cliente-routing.module';

import { DetalleClientePage } from './detalle-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleClientePageRoutingModule,
    DetalleClientePage
  ]
})
export class DetalleClientePageModule {}
