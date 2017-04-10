import { Component/*NgZone*/ } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login';

import firebase from 'firebase';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LoginPage;
  //zone: NgZone;

  constructor(platform: Platform) {
    //this.zone = new NgZone({});
    firebase.initializeApp({
      apiKey: "AIzaSyB11EG_8OeXo3CzSetngw7e0nQp86XL3xo",
      authDomain: "simple-subleasing.firebaseapp.com",
      databaseURL: "https://simple-subleasing.firebaseio.com",
      storageBucket: "simple-subleasing.appspot.com",
      messagingSenderId: "993168252989"
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
