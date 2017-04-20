import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import firebase from 'firebase';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  fireauth: any;

  constructor(public navCtrl: NavController, private nav:NavController, public angfire: AngularFire) {
  this.fireauth = firebase.auth();
  }

  public about() {
    this.nav.push(AboutPage);
  }
  public logout() {
    this.fireauth.signOut().then(function(){
      console.log('You are now logged out of firebase');
    }).catch(function(error){

    });
    this.angfire.auth.logout();
    window.localStorage.clear();
    this.navCtrl.setRoot(TabsPage);
    console.log('You are now logged out');
  }
}
