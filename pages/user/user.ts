import { Component } from '@angular/core';
import { AddlistingPage } from '../addlisting/addlisting';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AlertController } from 'ionic-angular';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import firebase from 'firebase';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})


export class UserPage {
  postings: FirebaseListObservable<any>;
  fireauth: any;
  email: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire, private nav:NavController, public alertCtrl: AlertController) {
    this.fireauth = firebase.auth();
    this.user = this.fireauth.currentUser;
    this.email = JSON.parse(window.localStorage.getItem('currentuser')).email;
    console.log("Email Check " + this.email);
    this.postings = angfire.database.list('/postings/' + window.localStorage.getItem(this.email));
  }

  public addlisting() {
    this.nav.push(AddlistingPage);
  }

  public changePassword() {
    this.nav.push(ChangepasswordPage);
  }

  changeemail(){
    let alert = this.alertCtrl.create({
    title: 'Email Change',
    subTitle: 'In order to change your email please enter in your current email and password.',
    inputs: [
      {
        name: 'email',
        placeholder: 'Current E-mail',
        type: 'email'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      },
      {
        name: 'newEmail',
        placeholder: 'New Email',
        type: 'email'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Change',
        handler: data => {
          const user = firebase.auth().currentUser;
          const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            data.password
          );
          user.reauthenticate(credential).then(function() {
            user.updateEmail(data.newEmail).then(function() {
              console.log("Email updated");
              // Update successful.
            }, function(error) {
              console.log("error on email update")
            });
          }, function(error) {
            console.log("Error on authentication")
          })
        }
      }
    ]
  });
  alert.present();
  }
  viewlistings(){
    this.navCtrl.push(HomePage, {selection: "user-listings"});
  }

}
