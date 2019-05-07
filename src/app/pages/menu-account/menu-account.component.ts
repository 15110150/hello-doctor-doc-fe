import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/model/doctor';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-account',
  templateUrl: './menu-account.component.html',
  styleUrls: ['./menu-account.component.scss']
})
export class MenuAccountComponent implements OnInit {

  public userProfile: Doctor;
  constructor(private accountService: AccountService, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.userProfile = new Doctor();
    this.getProfile();
  }

  getProfile(){
    this.accountService.getAccount()
    .subscribe(result => {
      this.userProfile = result;
      console.log(this.userProfile);
    });
  }

  btnLogout_click(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
