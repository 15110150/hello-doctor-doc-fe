import { Component, OnInit, OnDestroy } from '@angular/core';
import { Status } from 'src/app/model/status';
import { ListBooking } from 'src/app/model/list-booking';
import { DatePipe } from '@angular/common';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Router, NavigationEnd } from '@angular/router';
import { FcmService } from 'src/app/services/fcm/fcm.service';

@Component({
  selector: 'app-list-today',
  templateUrl: './list-today.component.html',
  styleUrls: ['./list-today.component.scss'],
  providers: [DatePipe]
})
export class ListTodayComponent implements OnInit, OnDestroy {

  public listToday: ListBooking[];
  public today = new Date();
  public strToday: any;
  public isShow = true;
  navigationSubscription;

  constructor(private bookingService: BookingService, private datePipe: DatePipe,
    private router: Router, private fcm: FcmService) {
    //subscribe to the router events
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        //Nếu đó là một sự kiện NavigationEnd refesh lại hàm (hoặc ngOnInit)
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.strToday = this.datePipe.transform(this.today, 'dd/MM/yyyy');
    this.getListToday();
  }

  ngOnDestroy() {
    //tránh rò rỉ bộ nhớ ở đây bằng cách dọn dẹp. 
    //Nếu không thì nó sẽ tiếp tục chạy phương thức getListBooking()
    // trên mỗi sự kiện navigationEnd.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getListToday() {
    this.bookingService.getListBookingToday(Status.ACCEPTED)
      .subscribe(result => {
        console.log(this.listToday);
        this.listToday = result.filter(
          item => item.dateTime.includes(this.strToday)
        )
      })
    this.isShow = false;

  }

  btnDone_click(booking: any) {
    booking.status = Status.FINISHED;
    this.bookingService.updateBooking(booking)
      .subscribe(result => {
        this.getListToday();
      })
  }

  test() {
    this.fcm.sendMess("kk");
  }
}
