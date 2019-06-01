import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { EditPriceComponent } from './edit-price.component';

const routes: Routes = [
  {
    path: '',
    component: EditPriceComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [DatePipe],
  declarations: [EditPriceComponent]
})
export class EditPriceModule {}
