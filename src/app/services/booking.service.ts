import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ListBooking } from 'src/app/model/list-booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private urlBooking = `${environment.apiUrlApi}/booking`;

  constructor(private http: HttpClient) {
  }

  getListBooking(status: any): Observable<ListBooking[]> {
    let accessToken = JSON.parse(localStorage.getItem('currentUser'));
    let header = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken.token);
    let url = this.urlBooking;
    url = url + '/book/list?status=' + status;
    return this.http.get<any>(url, {
      headers: header
    }).pipe(
      map(response => {
        const data = response.content;
        return data;
      }));


  }
}
