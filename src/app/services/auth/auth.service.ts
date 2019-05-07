import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {first, map} from 'rxjs/operators';
import { Account } from 'src/app/model/account';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  header: HttpHeaders;
  private urlLogin = `${environment.apiUrlApi}/auth2/login`;
  private jwtHeader = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8');
  }

  login(account: Account): Observable<Account> {
    return this.http.post<Account>(this.urlLogin, JSON.stringify(account), {
      headers: this.header
    })
      .pipe(
        map(response => {
          const data = response;
          localStorage.setItem('currentDoctor', JSON.stringify(data));
          console.log(localStorage.getItem('currentDoctor'));
          return data;
        }));
  }

  checkToken() {
    return this.jwtHeader.isTokenExpired(localStorage.getItem('currentDoctor'));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentDoctor');
  }

}
