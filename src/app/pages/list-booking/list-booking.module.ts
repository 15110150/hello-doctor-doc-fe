import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ListBookingComponent } from './list-booking.component';

const routes: Routes = [
  {
    path: '',
    component: ListBookingComponent,
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
  declarations: [ListBookingComponent]
})
export class ListBookingComponentModule {}
