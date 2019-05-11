import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking/booking.service';
import { ListBooking } from 'src/app/model/list-booking';
import { Status } from 'src/app/model/status';
import { Booking } from 'src/app/model/booking';

@Component({
  selector: 'app-list-waiting',
  templateUrl: './list-waiting.component.html',
  styleUrls: ['./list-waiting.component.scss']
})
export class ListWaitingComponent implements OnInit {

  public isShow = true;
  public listWaiting: ListBooking[];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.getListWaiting();
  }

  getListWaiting(){
    this.bookingService.getListBookingToday(Status.WAITING)
    .subscribe(result=> {
      this.listWaiting = result;
    })
    this.isShow = false;
    console.log(this.listWaiting);
  }

  btnOK_click(booking: ListBooking){
    booking.status = Status.ACCEPTED;
    this.bookingService.updateBooking(booking)
      .subscribe(result => {
        alert("Bạn đã xác nhận")
        this.getListWaiting();
      });
  }

  btnCancel_click(booking: any){
    booking.status = Status.DOCTOR_CANCEL;
    this.bookingService.updateBooking(booking)
      .subscribe(result => {
        alert("Bạn đã hủy")
        this.getListWaiting();
      });
  }

}
