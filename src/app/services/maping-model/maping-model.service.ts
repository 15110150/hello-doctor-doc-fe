import { Injectable } from '@angular/core';
import { Booking } from 'src/app/model/booking';
import { ListBooking } from 'src/app/model/list-booking';

@Injectable({
  providedIn: 'root'
})
export class MapingModelService {

  constructor() { }

  mapingBooking(booking: Booking, listBooking: ListBooking){
    booking.id = listBooking.id;
    booking.doctorId = listBooking.doctor.userId;
    booking.patientId = listBooking.patient.userId;
    booking.status = listBooking.status;
    booking.commentable = listBooking.commentable;
    booking.dateTime = listBooking.dateTime;
    booking.note = listBooking.note;
    booking.statusReason = listBooking.statusReason;
  }
}
