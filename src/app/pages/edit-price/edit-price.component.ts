import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrls: ['./edit-price.component.scss']
})
export class EditPriceComponent implements OnInit {

  isBasePrice = true;
  isPromotionPrice = false;

  curentSegment: any;

  constructor(private _location: Location) { }

  ngOnInit() {
    
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
