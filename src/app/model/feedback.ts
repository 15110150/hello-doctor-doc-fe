import { Doctor } from './doctor';
import { Patient } from './patient';

export class Feedback {
    bookId: number;
    content: string;
    doctor: Doctor;
    patient: Patient;
    rate: number;
}
  