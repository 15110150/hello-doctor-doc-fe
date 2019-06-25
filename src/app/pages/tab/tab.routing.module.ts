import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TabComponent} from './tab.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [

  {
    path: 'main',
    component: TabComponent,
    children: [
      {
        path: 'today',
        loadChildren: '../../pages/list-today/list-today.module#ListTodayComponentModule',
        canActivate: [AuthGuard] 
      },
      {
        path: 'account',
        loadChildren: '../../pages/menu-account/menu-account.module#MenuAccountComponentModule'
      },
      {
        path: 'waiting',
        loadChildren: '../../pages/list-waiting/list-waiting.module#ListWaitingComponentModule'
      },
      {
        path: 'all',
        loadChildren: '../../pages/list-booking/list-booking.module#ListBookingComponentModule'
      },
      {
        path: 'mail-box',
        loadChildren: '../../pages/mail-box/mail-box.module#MailBoxModule'
      },
    //   {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: '/main/home'
    //   }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/main/today'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabPageRoutingModule {
}
