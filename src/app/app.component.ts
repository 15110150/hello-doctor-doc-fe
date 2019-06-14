import { Component } from '@angular/core';
import { FcmService } from './services/fcm/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message;

  constructor(private fcm: FcmService) {
    this.initializeApp();
  }

  initializeApp() {
    console.log("hh");
    this.fcm.getPermission().subscribe();
  }
}