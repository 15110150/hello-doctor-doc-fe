import { Doctor } from './doctor';
import { Patient } from './patient';

export class ListBooking {
    commentable: boolean;
    dateTime: string;
    dateFormat: string;
    doctor: Doctor;
    id: number;
    note: string;
    patient: Patient;
    status: string;
    statusReason: string;
    numberBooking: number;
}
  