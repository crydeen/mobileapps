import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { AuthProviders, AuthMethods, AngularFire, FirebaseListObservable } from 'angularfire2';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { RecoverPage } from '../recover/recover';
import firebase from 'firebase';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: any;
  password: any;
  tabBarElement: any;
  fireauth: any;
  users: FirebaseListObservable<any>;
  apartments: FirebaseListObservable<any>;
  ref: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public angfire: AngularFire) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.fireauth = firebase.auth();
    this.users = angfire.database.list('/users');
    this.apartments = angfire.database.list('/apartments');
  }

  ionViewWillEnter(){
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave(){
    this.tabBarElement.style.display = 'flex';
  }

  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  public recover() {
    this.navCtrl.push(RecoverPage);
  }

  login() {
    this.fireauth.signInWithEmailAndPassword(this.email,this.password).catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;

    });
    this.angfire.auth.login({
      email: this.email,
      password: this.password
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((response) => {
        console.log('Login success' + JSON.stringify(response));
        let currentuser = {
          email: response.auth.email,
          picture: response.auth.photoURL
        };
        window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
        this.navCtrl.setRoot(TabsPage);
      }).catch((error) => {
        console.log(error);
    })

    this.apartments.subscribe(items => {
      console.log(items);
      items.forEach(addresses => {

      });
    });
    var database = firebase.database();
    //  this.users.push({
    //    email: this.email,
    //    favorites: null
    //  })
    // firebase.database().ref('/users/' + this.email).set({
    //
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
