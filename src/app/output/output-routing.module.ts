import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutputPage } from './output.page';

const routes: Routes = [
  {
    path: '',
    component: OutputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutputPageRoutingModule {}
