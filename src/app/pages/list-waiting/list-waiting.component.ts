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

  getListWaiting() {
    this.bookingService.getListBookingToday(Status.WAITING)
      .subscribe(result => {
        this.listWaiting = result;

        this.listWaiting.forEach(x => {
          this.bookingService.getListBookingAtTime(x.dateTime + ":00")
            .subscribe(result2 => {
              console.log(x.dateTime);
              x.numberBooking = result2.filter(
                item => item.status === Status.ACCEPTED
              ).length
            }
            )
          x.dateFormat = this.getDay(x.dateTime);
        });
      })
  }

  getDay(date: string) {
    var weekday = new Array(7);
    weekday[0] = "Chủ nhật";
    weekday[1] = "Thứ 2";
    weekday[2] = "Thứ 3";
    weekday[3] = "Thứ 4";
    weekday[4] = "Thứ 5";
    weekday[5] = "Thứ 6";
    weekday[6] = "Thứ 7";

    //date format là dd/mm/YYYY HH:mm nên cắt lấy dd/mm/YYYY phần đầu trước dấu cách
    var dateString = date.substr(0,date.indexOf(' '));
    var dateParts = dateString.split("/");

    var dateObject: Date = new Date(+dateParts[2], +dateParts[1]-1, +dateParts[0]);
    return weekday[dateObject.getDay()] + ", " + date;
  }

  btnOK_click(booking: ListBooking) {
    booking.status = Status.ACCEPTED;
    this.bookingService.updateBooking(booking)
      .subscribe(result => {
        alert("Bạn đã xác nhận")
        this.getListWaiting();
      });
  }

  btnCancel_click(booking: any) {
    booking.status = Status.DOCTOR_CANCEL;
    this.bookingService.updateBooking(booking)
      .subscribe(result => {
        alert("Bạn đã hủy")
        this.getListWaiting();
      });
  }

}
