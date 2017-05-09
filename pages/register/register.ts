import { Component } from '@angular/core';
import { NavController, AlertController/*,NavParams*/ } from 'ionic-angular';
import { AuthProviders, AuthMethods, AngularFire, FirebaseListObservable } from 'angularfire2';
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
  username: any;
  name: any;
  user: any;
  users: FirebaseListObservable<any>;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, public angfire: AngularFire) {
    this.fireauth = firebase.auth();
    this.users = angfire.database.list('/users');

  }

  public register() {
    this.fireauth.createUserWithEmailAndPassword(
    this.email,
    this.password
  ).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  window.localStorage.setItem(this.email, this.username);
  console.log(window.localStorage.getItem(this.email));
  window.localStorage.setItem(this.username, this.name);
  this.navCtrl.pop();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
