import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'admin2@gmail.com',
    password: '12345678'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.signIn(this.account).subscribe((data) => {
      localStorage.setItem('token', data['token']);
      localStorage.setItem('loggedIn', 'true');
      this.user.getRoles( localStorage.getItem('token')).subscribe(res => {
        // console.log(res['roles']);
   
         localStorage.setItem('roles', res['roles']);
         });
         this.user.getName(localStorage.getItem('token')).subscribe(res => {
           //console.log(res['roles']);
           localStorage.setItem('name', res['name']);
           localStorage.setItem('surname', res['surname']);
           localStorage.setItem('profilePic', res['profilePicture'])
           localStorage.setItem('email', this.account['email'])
           //this.router.navigate(['main']);
         });
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
