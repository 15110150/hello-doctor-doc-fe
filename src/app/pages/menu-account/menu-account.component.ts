import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/model/doctor';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FcmService } from 'src/app/services/fcm/fcm.service';
import { IdbService } from 'src/app/services/idb/idb.service';

@Component({
  selector: 'app-menu-account',
  templateUrl: './menu-account.component.html',
  styleUrls: ['./menu-account.component.scss']
})
export class MenuAccountComponent implements OnInit {

  public userProfile: Doctor;
  constructor(private accountService: AccountService, private authService: AuthService,
    private router: Router, private fcmService: FcmService, private indexDBService: IdbService) { }

  ngOnInit() {
    this.userProfile = new Doctor();
    this.getProfile();
  }

  getProfile() {
    this.accountService.getAccount()
      .subscribe(result => {
        this.userProfile = result;
        console.log(this.userProfile);
      });
  }

  btnLogout_click() {
    let token = localStorage.getItem('currentDevice');
    if (token === null) {
      this.indexDBService.deleteDatabase()
        .subscribe(result => {
          console.log(result);
          localStorage.removeItem('currentDevice');
          localStorage.removeItem('currentDoctor');
          this.router.navigateByUrl('/login').then(() => window.location.reload());
        })
    }
    else {
      this.fcmService.logout().then(result => {
        console.log(result);
        this.indexDBService.deleteDatabase()
          .subscribe(result => {
            console.log(result);
            localStorage.removeItem('currentDevice');
            localStorage.removeItem('currentDoctor');
            this.router.navigateByUrl('/login').then(() => window.location.reload());
          });
      }
      )
    }
  }

}
