import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import firebase from 'firebase';
/*
  Generated class for the Recover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recover',
  templateUrl: 'recover.html'
})
export class RecoverPage {
  email: any;
  fireauth: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fireauth = firebase.auth();
  }


 public recover() {
   this.fireauth.sendPasswordResetEmail(this.email);
   this.navCtrl.pop();
 }



  ionViewDidLoad() {
    console.log('ionViewDidLoad RecoverPage');
  }

}
