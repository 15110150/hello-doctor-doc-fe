import {Injectable, OnInit} from '@angular/core';
import {Observable, Subject, from, pipe} from 'rxjs';
import {ListBooking} from '../../model/list-booking';
import {Patient} from 'src/app/model/patient';
import {NgxIndexedDB} from 'ngx-indexed-db';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  private db: NgxIndexedDB;
  list: ListBooking[];

  constructor() {
    this.db = new NgxIndexedDB('doctorDB', 1);
    this.db.openDatabase(1, evt => {
      const listBookingStore = evt.currentTarget.result.createObjectStore('list-booking', {keyPath: 'id', autoIncrement: true});
      listBookingStore.createIndex('commentable', 'commentable', {unique: false});
      listBookingStore.createIndex('dateTime', 'dateTime', {unique: false});
      listBookingStore.createIndex('note', 'note', {unique: false});
      listBookingStore.createIndex('status', 'status', {unique: false});
      listBookingStore.createIndex('statusReason', 'statusReason', {unique: false});
      listBookingStore.createIndex('patient', 'patient', {unique: false});
    });
  }

  connecttoDBListBooking(listBooking: ListBooking[]) {
    this.db.openDatabase(1).then(() =>
      listBooking.forEach(x => {
        this.db.add('list-booking', {
          id: x.id,
          commentable: x.commentable,
          dateTime: x.dateTime,
          note: x.note,
          status: x.status,
          statusReason: x.statusReason,
          patient: x.patient,
        }).then(
          () => {
          },
          error => {
            console.log(error);
          }
        );
      })
    );
  }

  getListBooking(): Observable<any> {
    const p = this.db.openDatabase(1);
    return from(p.then(() => this.db.getAll('list-booking')));
  }
}
