import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutputPageRoutingModule } from './output-routing.module';

import { OutputPage } from './output.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutputPageRoutingModule
  ],
  declarations: [OutputPage]
})
export class OutputPageModule {}
