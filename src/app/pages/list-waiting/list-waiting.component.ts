import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking/booking.service';
import { ListBooking } from 'src/app/model/list-booking';
import { Status } from 'src/app/model/status';
import { Booking } from 'src/app/model/booking';
import { AlertController } from '@ionic/angular';
import { MapingModelService } from 'src/app/services/maping-model/maping-model.service';
import { StatusVI } from 'src/app/model/statusVI';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-waiting',
  templateUrl: './list-waiting.component.html',
  styleUrls: ['./list-waiting.component.scss']
})
export class ListWaitingComponent implements OnInit {

  public isShow = true;
  public listWaiting: ListBooking[];

  constructor(private bookingService: BookingService, private alertController: AlertController,
    private mapping: MapingModelService, private router: Router) { }

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
          x.statusVI = StatusVI.FINISHED;
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
    var dateString = date.substr(0, date.indexOf(' '));
    var dateParts = dateString.split("/");

    var dateObject: Date = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    return weekday[dateObject.getDay()] + ", " + date;
  }

  btnDetailBooking_click(id: any){
    this.router.navigate(['/detail-booking/detail-booking', id]);
  }

  btnOK_click(booking: ListBooking) {
    booking.status = Status.ACCEPTED;
    var bookingDTO = new Booking();
    this.mapping.mapingBooking(bookingDTO, booking);
    console.log(bookingDTO);
    this.bookingService.updateBooking(bookingDTO)
      .subscribe(result => {
        this.acceptBookingAlert()
        this.getListWaiting();
      });
  }

  btnCancel_click(booking: any) {
    this.confirmAlert(booking);
  }

  async cancelBookingAlert() {
    const alert = await this.alertController.create({
      header: 'Hủy lịch thành công',
      buttons: ['OK']
    });

    await alert.present();
  }

  async confirmAlert(booking) {
    const alert = await this.alertController.create({
      header: 'Xác nhận',
      message: 'Bạn có chắc hủy lịch hẹn này không!!!',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Xác nhận',
          handler: () => {
            this.reasonAlert(booking);
          }
        }
      ]
      
    });
    await alert.present();
  }

  async reasonAlert(booking) {
    const alert = await this.alertController.create({
      header: 'Lí do hủy',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Tôi đã kín lịch vào thời gian này',
          value: 'Tôi đã kín lịch vào thời gian này',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Tôi có việc đột xuất',
          value: 'Tôi có việc đột xuất'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Phòng khám tạm đóng cửa',
          value: 'Phòng khám tạm đóng cửa'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Lý do khác',
          value: 'Lý do khác'
        }
      ],
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Xác nhận',
          handler: (data: string) => {
              booking.status = Status.DOCTOR_CANCEL;
              booking.statusReason = data;
              var bookingDTO = new Booking();
              this.mapping.mapingBooking(bookingDTO, booking);
              console.log(bookingDTO);
              this.bookingService.updateBooking(bookingDTO)
                .subscribe(result => {
                  if (data != null){
                  this.cancelBookingAlert();
                  this.getListWaiting();
                  }
                },
                error=>{
                  this.errorBookingAlert();
                })
          }
        }
      ]
    });

    await alert.present();
  }

  async acceptBookingAlert() {
    const alert = await this.alertController.create({
      header: 'Xác nhận lịch thành công',
      buttons: ['OK']
    });
    await alert.present();
  }

  async errorBookingAlert() {
    const alert = await this.alertController.create({
      header: 'Xác nhận lịch thất bại',
      message: 'Xác nhận lịch thất bại, vui lòng liên hệ ban quản trị viên. Xin cảm ơn!',
      buttons: ['OK']
    });
    await alert.present();
  }


}
