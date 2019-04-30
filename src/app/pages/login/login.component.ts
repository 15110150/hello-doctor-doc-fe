import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  account: Account;

  constructor(private router: Router) {

  }

  ngOnInit() {
  
  }
  // go to register page
  register() {
    this.router.navigateByUrl('/register');
  }

  login(){
    this.router.navigateByUrl('/main/today');
  }
}
