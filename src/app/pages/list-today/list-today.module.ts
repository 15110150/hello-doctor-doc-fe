import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ListTodayComponent } from './list-today.component';

const routes: Routes = [
  {
    path: '',
    component: ListTodayComponent,
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListTodayComponent]
})
export class ListTodayComponentModule {}
