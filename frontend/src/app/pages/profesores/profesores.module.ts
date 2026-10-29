import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesoresPageRoutingModule } from './profesores-routing.module';

import { ProfesoresPage } from './profesores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesoresPageRoutingModule,
    ProfesoresPage
  ]
})
export class ProfesoresPageModule {}
