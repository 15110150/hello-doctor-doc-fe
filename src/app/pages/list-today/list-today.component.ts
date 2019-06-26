import { Component, OnInit, OnDestroy } from '@angular/core';
import { Status } from 'src/app/model/status';
import { ListBooking } from 'src/app/model/list-booking';
import { DatePipe } from '@angular/common';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Router, NavigationEnd } from '@angular/router';
import { FcmService } from 'src/app/services/fcm/fcm.service';
import { MapingModelService } from 'src/app/services/maping-model/maping-model.service';
import { Booking } from 'src/app/model/booking';
import { AlertController } from '@ionic/angular';
import { IdbService } from 'src/app/services/idb/idb.service';

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
    private router: Router, private fcm: FcmService, private mapping: MapingModelService,
    private alertController: AlertController, private indexDBService: IdbService) {
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
    if (!navigator.onLine) {
      console.log(navigator.onLine);
      //     this.listToday = this.indexDBService.getListBooking();
    }
    else {
      console.log(navigator.onLine);
      this.getListToday();
    }
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
        if (this.indexDBService.getListBooking() === null) {
          this.indexDBService.connecttoDBListBooking(this.listToday);
        }
        this.isShow = false;
      },
        error => {
          console.log("ofine");
          this.indexDBService.getListBooking()
            .subscribe(result => {
              this.isShow = false;
              this.listToday = result;
              console.log("vô rồi");
              console.log(result);
            });
        },
      )
  }

  btnDone_click(booking: any) {
    booking.status = Status.FINISHED;
    var bookingDTO = new Booking();
    this.mapping.mapingBooking(bookingDTO, booking)
    this.bookingService.updateBooking(bookingDTO)
      .subscribe(result => {
        if (result != null) {
          this.getListToday();
        }
      },
        error => {
          this.errorBookingAlert();
        })
  }

  btnDetailBooking_click(id: any) {
    this.router.navigate(['/detail-booking/detail-booking', id]);
  }

  btnPatientCancel_click(booking: any) {
    booking.status = Status.PATIENT_CANCEL;
    booking.statusReason = "Khách không đến khám";
    var bookingDTO = new Booking();
    this.mapping.mapingBooking(bookingDTO, booking)
    this.bookingService.updateBooking(bookingDTO)
      .subscribe(result => {
        if (result != null) {
          this.getListToday();
        }
      },
        error => {
          this.errorBookingAlert();
        })
  }

  async errorBookingAlert() {
    const alert = await this.alertController.create({
      header: 'Cập nhật thất bại',
      message: 'Cập nhật trạng thái lịch khám thất bại, vui lòng liên hệ ban quản trị viên. Xin cảm ơn!',
      buttons: ['OK']
    });
    await alert.present();
  }

}
