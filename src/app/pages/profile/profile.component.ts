import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Doctor } from 'src/app/model/doctor';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userProfile: Doctor;

  constructor(private accountService: AccountService, private _location: Location) { }

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

  btnBack_click(){
    this._location.back();
  }
}
