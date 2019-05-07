import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Account } from 'src/app/model/account';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  account: Account;

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.account = new Account();
  }
  // go to register page
  register() {
    this.router.navigateByUrl('/register');
  }

  // login and go to home page
  login() {
    this.authService.login(this.account)
      .subscribe(data => {
        if (data != null) {
          this.router.navigateByUrl('/main/today');
        }
      },
        error => {
          if (error.status = 404) {
            alert('Tài khoản không tồn tại');
          }
          else
            alert('Tên đăng nhập hoặc mật khẩu không đúng');
        });
  }
}
