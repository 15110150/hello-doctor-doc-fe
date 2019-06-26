import { Injectable } from '@angular/core';
import { MailBox } from 'src/app/model/mail-box';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailBoxService {

  private mailBox: MailBox;
  private urlMailBox = `${environment.apiUrlApi}/booking`;

  constructor(private http: HttpClient) {
  }

  getAllMail(userId: number): Observable<MailBox[]> {
    let accessToken = JSON.parse(localStorage.getItem('currentDoctor'));
    let header = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken.token);
    let url = this.urlMailBox + "/inbox/list/" + userId;
    return this.http.get<MailBox[]>(url, {
      headers: header
    })
      .pipe(
        map(response => {
          const data = response;
          return data;
        }));
  }

  getDetailMail(userId: number): Observable<MailBox> {
    let accessToken = JSON.parse(localStorage.getItem('currentDoctor'));
    let header = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken.token);
    let url = this.urlMailBox + "/inbox/" + userId;
    return this.http.get<MailBox>(url, {
      headers: header
    })
      .pipe(
        map(response => {
          const data = response;
          return data;
        }));
  }

  updateAllMailReaded(): Observable<any> {
    let accessToken = JSON.parse(localStorage.getItem('currentDoctor'));
    let header = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken.token);
    let url = this.urlMailBox + "/inbox/read" ;
    return this.http.post(url, {
      headers: header
    })
      .pipe(
        map(response => {
          const data = response;
          return data;
        }));
  }

  updateMailReaded(id: number): Observable<MailBox> {
    let accessToken = JSON.parse(localStorage.getItem('currentDoctor'));
    let header = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken.token);
    let url = this.urlMailBox + "/inbox/read/" + id ;
    return this.http.post<MailBox>(url, id, {
      headers: header
    })
      .pipe(
        map(response => {
          const data = response;
          return data;
        }));
  }
}
