import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ToastController } from '@ionic/angular';
import { tap, map } from 'rxjs/operators';

// Import firebase to fix temporary bug in AngularFire
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  private url = `${environment.apiUrlApi}/push`;
  token;
  private messaging;

  constructor(
    private afMessaging: AngularFireMessaging,
    private fun: AngularFireFunctions,
    private toastController: ToastController, private http: HttpClient
  ) {
    this.messaging = firebase.messaging();

    // Bind methods to fix temporary bug in AngularFire
    try {
      const _messaging = firebase.messaging();
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    } catch (e) { }
  }

  getPermission(): Observable<any> {
    return this.afMessaging.requestToken.pipe(
      tap(
        token => (
          localStorage.setItem('tokenSub', token)
        ),
      )
    )
  }

  request_permission_for_notifications() {
    if (Notification.permission !== "granted") {
      this.messaging.requestPermission().then(() => {
        return firebase.messaging().getToken();
      }).then(token => {
        let accessToken = JSON.parse(localStorage.getItem('currentDoctor'));
        let urlSub = this.url + '/subscribe'
        const headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + accessToken.token);
        return this.http.post(urlSub, token, {
          headers: headers
        }).pipe(
          map(response => {
            const data = response;
            localStorage.setItem('currentDevice', token);
            console.log(localStorage.getItem('currentDevice'))
            return data;
          })).toPromise();
      }
      )
    }
    else{
      return firebase.messaging().getToken().then(
      token => {
        let accessToken = JSON.parse(localStorage.getItem('currentDoctor'));
        let urlSub = this.url + '/subscribe'
        const headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + accessToken.token);
        return this.http.post(urlSub, token, {
          headers: headers
        }).pipe(
          map(response => {
            const data = response;
            localStorage.setItem('currentDevice', token);
            console.log(localStorage.getItem('currentDevice'))
            return data;
          })).toPromise();
      }
      )
    }
  }

  logout() {
    let accessToken = JSON.parse(localStorage.getItem('currentDoctor'));
    let token = localStorage.getItem('currentDevice');
    console.log(accessToken);
    let urlUnSub = this.url + '/unsubscribe';
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken.token);
    return this.http.post(urlUnSub, token, {
      headers: headers,
      responseType: "text"
    }).pipe(
      map(response => {
        const data = response;
        return data;
      })).toPromise();
  }
}