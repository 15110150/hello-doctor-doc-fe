import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/model/status';
import { ListBooking } from 'src/app/model/list-booking';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.scss']
})
export class ListBookingComponent implements OnInit {

  public isShow = false;
  public listwaiting = true;
  public listdone = false;
  public listcancel = false;
  public status: any;
  public listBoooking: ListBooking[];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.isShow = true;
    this.listBoooking = null;
    if (ev.detail.value === "waiting") {
      this.listwaiting = true;
      this.listdone = false;
      this.listcancel = false;
      this.status = Status.WAITING + ',' + Status.ACCEPTED;
    }
    else if (ev.detail.value === "done") {
      this.listwaiting = false;
      this.listdone = true;
      this.listcancel = false;
      this.status = Status.FINISHED;
    }
    else if (ev.detail.value === "cancel") {
      this.listwaiting = false;
      this.listdone = false;
      this.listcancel = true;
      this.status = Status.DOCTOR_CANCEL + ',' + Status.PATIENT_CANCEL + ',' + Status.EXPIRED;
    }
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
