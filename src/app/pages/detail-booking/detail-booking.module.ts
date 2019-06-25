import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DetailBookingComponent } from './detail-booking.component';

const routes: Routes = [
  {
    path: 'detail-booking/:id',
    component: DetailBookingComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailBookingComponent]
})
export class DetailBookingModule {}
