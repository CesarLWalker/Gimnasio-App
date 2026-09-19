import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleProfesorPageRoutingModule } from './detalle-profesor-routing.module';

import { DetalleProfesorPage } from './detalle-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleProfesorPageRoutingModule
  ],
  declarations: [DetalleProfesorPage]
})
export class DetalleProfesorPageModule {}
