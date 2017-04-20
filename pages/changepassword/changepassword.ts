import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import firebase from 'firebase';
/*
  Generated class for the Changepassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html'
})
export class ChangepasswordPage {
  password: any;
  fireauth: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fireauth = firebase.auth();
  }

  changePassword() {
    var user = this.fireauth.currentUser;
    user.updatePassword(this.password);
    this.navCtrl.pop();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

}
