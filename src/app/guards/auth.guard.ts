import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService} from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authen: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentDoctor')) {
     if (!this.authen.checkToken()) {
      return true;
     }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
