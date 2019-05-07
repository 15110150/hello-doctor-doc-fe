import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ListWaitingComponent } from './list-waiting.component';

const routes: Routes = [
  {
    path: '',
    component: ListWaitingComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListWaitingComponent]
})
export class ListWaitingComponentModule {}
