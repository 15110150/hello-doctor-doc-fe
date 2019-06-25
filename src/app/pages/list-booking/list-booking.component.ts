import { Component, OnInit, OnDestroy } from '@angular/core';
import { Status } from 'src/app/model/status';
import { ListBooking } from 'src/app/model/list-booking';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StatusVI } from 'src/app/model/statusVI';

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

  //giá trị lớn nhất/ nhỏ nhất của datetime Picker lọc thời gian bắt đầu
  minStartDate: any;
  maxStartDate: any;
  //giá trị lớn nhất/ nhỏ nhất của datetime Picker lọc thời gian kết thúc
  minEndDate: any;
  maxEndDate: any;
  //mảng lưu tháng/năm
  monthValue: Array<number>;
  yearValue: Array<number>;
  //#endregion

  constructor(private bookingService: BookingService, private router: Router, private datePipe: DatePipe) {
    //subscribe to the router events
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd && this.status != null) {
        //Nếu đó là một sự kiện NavigationEnd refesh lại hàm (hoặc ngOnInit)
        this.getListBooking(this.startDate, this.endDate, this.status);
      }
    });
  }

  initTime() {
    var today = new Date();
    this.monthValue = new Array();
    this.yearValue = new Array();
    //Gồm tháng này và tháng sau
    this.monthValue.push(today.getMonth() + 1);
    this.monthValue.push(today.getMonth() + 2);
    //Gồm năm nay
    this.yearValue.push(today.getFullYear());
  }

  //hàm cập nhật thời gian khi có sự kiện thay đổi thời gian chọn
  updateMyDate($event: any) {
    //this.endDate = this.parseDate(this.startDate);
    if (this.curentSegment === "waiting") {
      this.minEndDate = new Date();

      var starDateTemp = new Date(this.startDate);
      this.minEndDate = starDateTemp;

      var temp = new Date(this.maxStartDate);
      temp.setDate(temp.getDate() - 7);
      if(starDateTemp > temp){
        this.endDate = starDateTemp.toISOString();
      }
      else{
        this.endDate = this.parseDate(this.startDate, true);
      }
      this.minEndDate = this.datePipe.transform(this.minEndDate, 'yyyy-MM-dd');

    }
    else {
      this.minEndDate = new Date();
      this.maxEndDate = new Date();

      var starDateTemp = new Date(this.startDate);
      this.minEndDate = starDateTemp;
      
      this.maxEndDate.setMonth(this.minEndDate.getMonth()+1);

       if(starDateTemp > temp){
        this.endDate = starDateTemp.toISOString();
      }
      else
      {
        this.endDate = this.parseDate(this.startDate, true);
      }
      this.minEndDate = this.datePipe.transform(this.minEndDate, 'yyyy-MM-dd');
      this.maxEndDate = this.datePipe.transform(this.maxEndDate, 'yyyy-MM-dd');

      
    }
  }

  ngOnInit() {
  }

  getDay(date: string) {
    var weekday = new Array(7);
    weekday[0] = "CN";
    weekday[1] = "Thứ 2";
    weekday[2] = "Thứ 3";
    weekday[3] = "Thứ 4";
    weekday[4] = "Thứ 5";
    weekday[5] = "Thứ 6";
    weekday[6] = "Thứ 7";

    //date format là dd/mm/YYYY HH:mm nên cắt lấy dd/mm/YYYY phần đầu trước dấu cách
    var dateString = date.substr(0, date.indexOf(' '));
    var dateParts = dateString.split("/");

    var dateObject: Date = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    return weekday[dateObject.getDay()] + ", " + date;
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

    if (future === true) {
      start.setDate(start.getDate() + 7)
    }
    else{
      start.setDate(start.getDate() - 7)
    }
    return start.toISOString();
  }

  intDate() {
    if (this.curentSegment === "waiting") {
      this.startDate = new Date().toISOString();
      this.endDate = this.parseDate(this.startDate, true);

      this.maxStartDate = new Date();
      this.minStartDate = new Date(); 
      this.maxEndDate = new Date();
      this.minEndDate = new Date();

      this.maxStartDate.setMonth(this.minStartDate.getMonth() + 2);
      this.minEndDate.setDate(this.minStartDate.getDate());
      this.maxEndDate.setMonth(this.minStartDate.getMonth() + 2);

      this.minStartDate = this.datePipe.transform(this.minStartDate, 'yyyy-MM-dd');
      this.maxStartDate = this.datePipe.transform(this.maxStartDate, 'yyyy-MM-dd');
      this.minEndDate = this.datePipe.transform(this.minEndDate, 'yyyy-MM-dd');
      this.maxEndDate = this.datePipe.transform(this.maxEndDate, 'yyyy-MM-dd');
     
    }
    else if (this.curentSegment === "done" || this.curentSegment === "cancel") {
      this.endDate = new Date().toISOString();
      this.startDate = this.parseDate(this.endDate, false);

      this.maxStartDate = new Date();
      this.minStartDate = new Date('2018-01-01'); //
      this.maxEndDate = new Date();
      this.minEndDate = new Date();

      this.minEndDate.setDate(this.minStartDate.getDate());
      this.maxEndDate.setMonth(this.minEndDate.getMonth() + 1);

      this.minStartDate = this.datePipe.transform(this.minStartDate, 'yyyy-MM-dd');
      this.maxStartDate = this.datePipe.transform(this.maxStartDate, 'yyyy-MM-dd');
      this.minEndDate = this.datePipe.transform(this.minEndDate, 'yyyy-MM-dd');
      this.maxEndDate = this.datePipe.transform(this.maxEndDate, 'yyyy-MM-dd');
     
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
      this.listwaiting = true; this.listdone = false; this.listcancel = false;
      this.status = Status.ACCEPTED;
    }
    else if (this.curentSegment === "done") {
      this.listwaiting = false; this.listdone = true; this.listcancel = false;
      this.status = Status.FINISHED;
    }
    else if (this.curentSegment === "cancel") {
      this.listwaiting = false; this.listdone = false; this.listcancel = true;
      this.status = Status.DOCTOR_CANCEL + ',' + Status.PATIENT_CANCEL + ',' + Status.EXPIRED;
    }
    this.intDate();
    this.getListBooking(this.startDate, this.endDate, this.status);
  }

  getListBooking(startDate: any, endDate: any, status: any) {
    var _startDate = new Date(startDate);
    var tempStartDate = this.datePipe.transform(_startDate, 'dd/MM/yyyy hh:mm:ss');

    var _endDate = new Date(endDate);
    var tempEndDate = this.datePipe.transform(_endDate, 'dd/MM/yyyy hh:mm:ss');

    this.bookingService.getListBookingAtPeriod(tempStartDate, tempEndDate, status)
      .subscribe(
        result => {
          this.listBoooking = result;
          this.listBoooking.forEach(x=>{
            x.dateFormat = this.getDay(x.dateTime);
            if(x.status === Status.ACCEPTED){
              x.statusVI = StatusVI.ACCEPTED;
            }
            else if(x.status === Status.DOCTOR_CANCEL){
              x.statusVI = StatusVI.DOCTOR_CANCEL;
            }
            else if(x.status === Status.DOCTOR_CANCEL){
              x.statusVI = StatusVI.DOCTOR_CANCEL;
            }
            else if(x.status === Status.EXPIRED){
              x.statusVI = StatusVI.EXPIRED;
            }
            else if(x.status === Status.FINISHED){
              x.statusVI = StatusVI.FINISHED;
            }
            else if(x.status === Status.PATIENT_CANCEL){
              x.statusVI = StatusVI.PATIENT_CANCEL;
            }
            else if(x.status === Status.WAITING){
              x.statusVI = StatusVI.WAITING;
            }
          })
        }
      )
  }

  btnDetailBooking_click(id: any){
    this.router.navigate(['/detail-booking/detail-booking', id]);
  }

  bnSearch_click(){
    this.getListBooking(this.startDate, this.endDate, this.status);
  }

}
