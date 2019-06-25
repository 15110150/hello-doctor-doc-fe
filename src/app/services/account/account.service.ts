import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Doctor } from 'src/app/model/doctor';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private urlPatient = `${environment.apiUrlApi}/account/profile/doctor`;

  constructor(private http: HttpClient) {
  }

  getAccount(): Observable<Doctor> {
    let accessToken = JSON.parse(localStorage.getItem('currentDoctor'));
    let header = new HttpHeaders()
    .set('Authorization',  'Bearer ' + accessToken.token);
    let url = this.urlPatient;
    return this.http.get<Doctor>(url, {
      headers: header
    })
      .pipe(
        map(response => {
          const data = response;
          return data;
        }));
  }
  updateProfile(doctor: Doctor): Observable<Doctor> {
    let accessToken = JSON.parse(localStorage.getItem('currentDoctor'));
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + accessToken.token);
    return this.http.post<Doctor>(this.urlPatient, JSON.stringify(doctor), {
      headers: headers
    })
      .pipe(
        map(response => {
          const data = response;
          return data;
        }));
  }
}
