import { Component, OnInit, OnDestroy } from '@angular/core';
import { Status } from 'src/app/model/status';
import { ListBooking } from 'src/app/model/list-booking';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.scss']
})
export class ListBookingComponent implements OnInit, OnDestroy {

  //#region : cờ lưu trạng thái đã có dữ liệu danh sách lịch hẹn chưa
  isShow = false;
  //#endregion

  //#region : cờ lưu trạng thái của danh sách (bật/tắt)
  //cờ của danh sách lịch hẹn đang chờ
  listwaiting = true;
  //cờ của danh sách lịch hẹn đã khám
  listdone = false;
  //cờ của danh sach lịch hẹn đã hủy
  listcancel = false;
  //#endregion

  //trạng thái của danh sách cần lấy
  status: string;

  //biến lưu trữ Segment nào được chọn
  curentSegment: string;

  //biến lưu trữ danh sách lịch hẹn
  listBoooking: ListBooking[];

  //subscribe to the router
  navigationSubscription;

  //#region : biến lưu/hiển thị thời gian dể lọc danh sách
  //thời gian bắt đầu
  startDate = new Date().toISOString();
  //thời gian kết thúc
  endDate: any;
  //cờ readonly thời gian bắt đầu
  isReadonly: boolean;
  //#endregion

  constructor(private bookingService: BookingService, private router: Router) {
    //subscribe to the router events
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        //Nếu đó là một sự kiện NavigationEnd refesh lại hàm (hoặc ngOnInit)
        this.getListBooking(this.status);
      }
    });
  }

  //hàm cập nhật thời gian lọc
  updateMyDate($event: any) {
    //this.endDate = this.parseDate(this.startDate);
    if (this.curentSegment === "waiting") {
      this.endDate = this.parseDate(this.startDate, true);
    }
    else  {
      this.startDate = this.parseDate(this.endDate, false);
    }
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    //tránh rò rỉ bộ nhớ ở đây bằng cách dọn dẹp. 
    //Nếu không thì nó sẽ tiếp tục chạy phương thức getListBooking()
    // trên mỗi sự kiện navigationEnd.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  //hàm cộng thời gian 
  parseDate(date1: any, future: boolean) {
    var start = new Date(date1);

    var tempDate: any;
    tempDate = new Date();

    if (future === true) {
      tempDate.setDate(start.getDate() + 7)
    }
    else
      tempDate.setDate(start.getDate() - 7)
    return tempDate.toISOString();
  }

  intDate() {
    if (this.curentSegment === "waiting") {
      this.startDate = new Date().toISOString();
      this.endDate = this.parseDate(this.startDate, true);
    }
    else if (this.curentSegment === "done" || this.curentSegment === "cancel") {
      this.endDate = new Date().toISOString();
      this.startDate = this.parseDate(this.endDate, false);
    }
  }

  changeStateList(a: boolean, b: boolean, c: boolean) {
    a = true;
    b = false;
    c = false;
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.isShow = true;
    this.listBoooking = null;
    this.curentSegment = ev.detail.value;
    if (this.curentSegment === "waiting") {
      this.isReadonly = true;
      this.changeStateList(this.listwaiting, this.listdone, this.listcancel);
      this.status = Status.WAITING + ',' + Status.ACCEPTED;
    }
    else if (this.curentSegment === "done") {
      this.isReadonly = false;
      this.changeStateList(this.listdone, this.listwaiting, this.listcancel);
      this.status = Status.FINISHED;
    }
    else if (this.curentSegment === "cancel") {
      this.isReadonly = false;
      this.changeStateList(this.listcancel, this.listwaiting, this.listdone);
      this.status = Status.DOCTOR_CANCEL + ',' + Status.PATIENT_CANCEL + ',' + Status.EXPIRED;
    }
    this.intDate();
    this.getListBooking(this.status);
  }

  getListBooking(status: any) {
    this.bookingService.getListBooking(status)
      .subscribe(
        result => {
          this.listBoooking = result;
        }
      )
  }

}
