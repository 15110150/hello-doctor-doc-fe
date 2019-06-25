import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  public patientId : number;
  public patient : Patient;

  constructor( private router: Router, private patientService : PatientService,
    private activatedRoute : ActivatedRoute, private _location: Location) {
    if (this.activatedRoute.snapshot.params['id']) {
      this.patientId = this.activatedRoute.snapshot.params['id'];
    }
  }

  ngOnInit() {
    this.patient = new Patient();
    this.getPatient();
  }

  getPatient() {
    this.patientService.getPatient(this.patientId)
      .subscribe(result => {
        this.patient = result;
      });
  }

  btnBack_click()
  {
    this._location.back();
  }

}
