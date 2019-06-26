import { Injectable } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { ListBooking } from '../../model/list-booking';
import { Patient } from 'src/app/model/patient';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdbService {

  db;
  list: ListBooking[];

  constructor() {

  }

  connecttoDBListBooking(listBooking: ListBooking[]) {
    let db = new NgxIndexedDB('doctorDB', 1);
    db.openDatabase(1, evt => {
      let listBookingStore = evt.currentTarget.result.createObjectStore('list-booking', { keyPath: 'id', autoIncrement: true });
      listBookingStore.createIndex('commentable', 'commentable', { unique: false });
      listBookingStore.createIndex('dateTime', 'dateTime', { unique: false });
      listBookingStore.createIndex('note', 'note', { unique: false });
      listBookingStore.createIndex('status', 'status', { unique: false });
      listBookingStore.createIndex('statusReason', 'statusReason', { unique: false });
      listBookingStore.createIndex('patient', 'patient', { unique: false });
    }).then(function () {
      console.log("from idb");
      listBooking.forEach(x => {
        db.add('list-booking', {
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

    }
    )
  }



  getListBooking(): Observable<any> {
    let db = new NgxIndexedDB('doctorDB', 1);
    var list: ListBooking[];
    return from(db.openDatabase(1, evt => {
      let listBookingStore = evt.currentTarget.result.createObjectStore('list-booking', { keyPath: 'id', autoIncrement: true });
      listBookingStore.createIndex('commentable', 'commentable', { unique: false });
      listBookingStore.createIndex('dateTime', 'dateTime', { unique: false });
      listBookingStore.createIndex('note', 'note', { unique: false });
      listBookingStore.createIndex('status', 'status', { unique: false });
      listBookingStore.createIndex('statusReason', 'statusReason', { unique: false });
      listBookingStore.createIndex('patient', 'patient', { unique: false });
    }).then(function () {
       db.getAll('list-booking').then(
        result => {
          list = result;
          console.log(list);
          return list;
        },
        error => {
          console.log(error);
        }
      );
      return list;
    },
    )
    )
  }
}