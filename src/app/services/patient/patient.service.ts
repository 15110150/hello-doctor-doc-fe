import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Patient } from 'src/app/model/patient';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private urlPatient = `${environment.apiUrlApi}/account/profile/patient`;

  constructor(private http: HttpClient) {
  }

  getPatient(id : number): Observable<Patient> {
    let accessToken = JSON.parse(localStorage.getItem('currentDoctor'));
    let header = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken.token);
    let url = this.urlPatient;
    url = url + '/' + id ;
    return this.http.get<Patient>(url, {
      headers: header
    })
      .pipe(
        map(response => {
          const data = response;
          return data;
        }));
  }

}
