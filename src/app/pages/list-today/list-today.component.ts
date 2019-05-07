import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/model/status';
import { ListBooking } from 'src/app/model/list-booking';
import { DatePipe } from '@angular/common';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  selector: 'app-list-today',
  templateUrl: './list-today.component.html',
  styleUrls: ['./list-today.component.scss'],
  providers: [DatePipe]
})
export class ListTodayComponent implements OnInit {

  public listToday: ListBooking[];
  public today = new Date();
  public strToday: any;
  public isShow = true;

  constructor(private bookingService: BookingService,private datePipe: DatePipe) { }

  ngOnInit() {
    this.getListToday();
    this.strToday =  this.datePipe.transform(this.today, 'dd/MM/YY');
  }

  getListToday(){
    this.bookingService.getListBookingToday(Status.ACCEPTED)
    .subscribe(result=> {
      this.listToday = result.filter(
        item => item.dateTime.includes(this.strToday)
     )
    })
    this.isShow = false;
    console.log(this.listToday);
  }

  btnDone_click(){

  }
}
