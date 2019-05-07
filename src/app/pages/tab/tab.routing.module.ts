import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TabComponent} from './tab.component';

const routes: Routes = [

  {
    path: 'main',
    component: TabComponent,
    children: [
      {
        path: 'today',
        loadChildren: '../../pages/list-today/list-today.module#ListTodayComponentModule'
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
    //   {
    //     path: 'profile',
    //     loadChildren: '../../pages/user-profile/user-profile.module#UserProfileComponentModule'
    //   },
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
