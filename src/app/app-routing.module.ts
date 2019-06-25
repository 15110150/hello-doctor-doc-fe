import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfileComponentModule' },
  { path: 'edit-price', loadChildren: './pages/edit-price/edit-price.module#EditPriceModule' },
  { path: 'detail-booking', loadChildren: './pages/detail-booking/detail-booking.module#DetailBookingModule' },
  { path: 'patient-profile', loadChildren: './pages/patient-profile/patient-profile.module#PatientProfileModule' },
  { path: '', loadChildren: './pages/tab/tab.module#TabComponentModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
