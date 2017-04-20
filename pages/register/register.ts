import { Component } from '@angular/core';
import { NavController, AlertController/*,NavParams*/ } from 'ionic-angular';
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import firebase from 'firebase';
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  email: any;
  password: any;
  fireauth: any;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, public angfire: AngularFire) {
    this.fireauth = firebase.auth();
  }

  public register() {
    this.fireauth.createUserWithEmailAndPassword(
    this.email,
    this.password
  ).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  this.navCtrl.pop();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
