import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Account } from 'src/app/model/account';
import { FcmService } from 'src/app/services/fcm/fcm.service';
import { AlertController } from '@ionic/angular';
import { IdbService } from 'src/app/services/idb/idb.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  account: Account;

  constructor(private router: Router, private authService: AuthService,
    private fcmService: FcmService, public alertController: AlertController, private indexDBService: IdbService) {

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
          this.indexDBService = new IdbService();
          this.router.navigateByUrl('/main/today');
          this.fcmService.getPermission().subscribe(
            next => this.fcmService.request_permission_for_notifications()
          );
        }
      },
        error => {
          if (error.status = 404) {
            this.notExistAlert();
          }
          else
            this.incorrectAlert();
        });
  }

  async notExistAlert() {
    const alert = await this.alertController.create({
      header: 'Đăng nhập không thành công',
      message: 'Tài khoản không tồn tại. Xin quí khách kiểm tra lại thông tin',
      buttons: ['OK']
    });
    await alert.present();
  }

  async incorrectAlert() {
    const alert = await this.alertController.create({
      header: 'Đăng nhập không thành công',
      message: 'Tên đăng nhập hoặc mật khẩu không đúng. Xin quí khách kiểm tra lại thông tin',
      buttons: ['OK']
    });
    await alert.present();
  }
}
