import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Doctor } from 'src/app/model/doctor';
import { AccountService } from 'src/app/services/account/account.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrls: ['./edit-price.component.scss']
})
export class EditPriceComponent implements OnInit {

  isBasePrice = true;
  isPromotionPrice = false;
  curentSegment: any;
  doctor: Doctor;
  newPrice;

  constructor(private _location: Location, private accountService: AccountService,
    private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.getDoctor();
    this.doctor = new Doctor();
  }

  btnSubmit_click(){
    this.updateDoctor( this.doctor);
  }

  getDoctor(){
    this.accountService.getAccount()
    .subscribe(result => {
      this.doctor = result;
    });
  }
  
updateDoctor(doctor){
  this.doctor.basePrice = this.newPrice;
  this.accountService.updateProfile(doctor)
  .subscribe(data => {
    if (data != null) {
      this.successUpdateAlert();
      this._location.back();
    }
  },
    error => {
      this.errorUpdateAlert();
    });
}

async successUpdateAlert() {
  const alert = await this.alertController.create({
    header: 'Cập nhật giá khám thành công',
    buttons: ['OK']
  });

  await alert.present();
}

async errorUpdateAlert() {
  const alert = await this.alertController.create({
    header: 'Cập nhật thất bại',
    message: 'Cập nhật giá khám không thành công, vui lòng liên hệ ban quản trị viên. Xin cảm ơn!',
    buttons: ['OK']
  });

  await alert.present();
}


  segmentChanged(ev: any) {
    this.curentSegment = ev.detail.value;
    if (this.curentSegment === "base-price"){
      this.isBasePrice = true;
      this.isPromotionPrice = false;
    }
    else if (this.curentSegment === "promotion-price"){
      this.isPromotionPrice = true;
      this.isBasePrice = false;
    }
  }

  checkNumber(discount: any){
    if(discount<0 || discount>100){
    }
  }

  btnBack_click(){
    this._location.back();
  }

}
