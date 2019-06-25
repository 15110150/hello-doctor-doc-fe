import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ListBooking } from 'src/app/model/list-booking';
import { Booking } from 'src/app/model/booking';
import { Status } from 'src/app/model/status';
import { Feedback } from 'src/app/model/feedback';
import { StatusVI } from 'src/app/model/statusVI';

@Component({
  selector: 'app-detail-booking',
  templateUrl: './detail-booking.component.html',
  styleUrls: ['./detail-booking.component.scss']
})
export class DetailBookingComponent implements OnInit {

  bookId;
  booking: ListBooking;
  status: string;
  feedback: Feedback;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private _location: Location, private bookingService: BookingService, ) {
    if (this.activatedRoute.snapshot.params['id']) {
      this.bookId = this.activatedRoute.snapshot.params['id'];
    }
  }

  ngOnInit() {
    this.booking = new ListBooking();
    this.getBooking();
  }

  btnBack_click() {
    this._location.back();
  }

  btnMap_click(address: string){
    this.router.navigate(['/map/address', "doctor", address]);
  }

  getBooking() {
    this.bookingService.getDetailBooking(this.bookId)
      .subscribe(result => {
        this.booking = result;
        if(this.booking.status === Status.ACCEPTED){
          this.booking.statusVI = StatusVI.ACCEPTED;
        }
        else if(this.booking.status === Status.DOCTOR_CANCEL){
          this.booking.statusVI = StatusVI.DOCTOR_CANCEL;
        }
        else if(this.booking.status === Status.DOCTOR_CANCEL){
          this.booking.statusVI = StatusVI.DOCTOR_CANCEL;
        }
        else if(this.booking.status === Status.EXPIRED){
          this.booking.statusVI = StatusVI.EXPIRED;
        }
        else if(this.booking.status === Status.FINISHED){
          this.booking.statusVI = StatusVI.FINISHED;
        }
        else if(this.booking.status === Status.PATIENT_CANCEL){
          this.booking.statusVI = StatusVI.PATIENT_CANCEL;
        }
        else if(this.booking.status === Status.WAITING){
          this.booking.statusVI = StatusVI.WAITING;
        }
        if (this.booking.status == Status.FINISHED && this.booking.commentable == false) {
          this.bookingService.getDetailFeedback(this.bookId)
            .subscribe(result => {
              this.feedback = result;
            }
            )
          }
        });
  }

  btnPatientDetail_click(id: any) {
    this.router.navigate(['/patient-profile/patient', id]);
  }

}
