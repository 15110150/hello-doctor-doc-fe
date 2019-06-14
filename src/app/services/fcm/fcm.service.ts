import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';

// Import firebase to fix temporary bug in AngularFire
import * as app from 'firebase';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  token;
  currentMessage = new BehaviorSubject(null);


  constructor(
    private afMessaging: AngularFireMessaging,
    private fun: AngularFireFunctions,
    private toastController: ToastController
  ) {

    // Bind methods to fix temporary bug in AngularFire
    try {
      const _messaging = app.messaging();
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    } catch (e) { }


    /// METHODS GO HERE ///
  }
  async makeToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'dismiss'
    });
    toast.present();
  }

  getPermission(): Observable<any> {
    return this.afMessaging.requestToken.pipe(
      tap(token => (this.token = token))
    ) 
  }

  showMessages(): Observable<any> {
    return this.afMessaging.messages.pipe(
      tap(msg => {
        const body: any = (msg as any).notification.body;
        this.makeToast(body);
      })
    );
  }
  sub(topic) {
    this.fun
      .httpsCallable('subscribeToTopic')({ topic, token: this.token })
      .pipe(tap(_ => this.makeToast(`subscribed to ${topic}`)))
      .subscribe();
  }
  
  unsub(topic) {
    this.fun
      .httpsCallable('unsubscribeFromTopic')({ topic, token: this.token })
      .pipe(tap(_ => this.makeToast(`unsubscribed from ${topic}`)))
      .subscribe();
  }
  sendMess(topic) {
    this.fun
      .httpsCallable('sendMassage')({ topic, token: this.token })
      .subscribe();
  }
  receiveMessage() {
    this.afMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })
  }
}