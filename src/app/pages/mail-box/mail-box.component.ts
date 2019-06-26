import { Component, OnInit } from '@angular/core';
import { MailBoxService } from 'src/app/services/mail-box/mail-box.service';
import { MailBox } from 'src/app/model/mail-box';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Router, NavigationEnd } from '@angular/router';
import { PopoverController, AlertController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.scss']
})
export class MailBoxComponent implements OnInit {

  listMail: MailBox[];
  userId: number;

  navigationSubscription
  constructor(private mailBoxService: MailBoxService, private accountService: AccountService,
    private router: Router, private alertController: AlertController) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.getAllMail();
      }
    });
  }

  ngOnInit() {
    this.getAllMail();
  }

  doRefresh(event) {
    this.accountService.getAccount()
      .subscribe(result => {
        event.target.complete();
        this.userId = result.userId;
        this.mailBoxService.getAllMail(this.userId)
          .subscribe(result => {
            this.listMail = result;
            console.log(this.listMail);
          },
            error => {

            })
      },
        error => {

        }
      );

  }

  getAllMail() {
    this.accountService.getAccount()
      .subscribe(result => {
        this.userId = result.userId;
        this.mailBoxService.getAllMail(this.userId)
          .subscribe(result => {
            this.listMail = result;
            this.listMail.sort((a,b) => b.id - a.id);
            console.log(this.listMail);
          },
            error => {

            })
      },
        error => {

        }
      );
  }

  btnDetail_click(mail: MailBox) {
    this.detailAlert(mail);
    //this.updateMail(mail);
  }

  updateMail(id: number) {
    this.mailBoxService.updateMailReaded(id)
      .subscribe(result => {
        console.log("update")
        this.getAllMail();
      })
  }

  async detailAlert(mail: MailBox) {
    var link = mail.clickAction;
    const alert = await this.alertController.create({
      header: mail.title,
      message: mail.body,
      buttons: [
        {
          text: 'Chi tiết',
          handler: () => {
            if (link.includes("main/waiting")) {
              this.router.navigateByUrl('/main/waiting');
            }
          }
        }
      ],
    });
    alert.onDidDismiss().then(() => {
      this.updateMail(mail.id);
    })
    await alert.present();
  }

}
