import { Component } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AddlistingPage} from '../addlisting/addlisting';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fireauth: any;
  apartment: string = "favorites";
  apartments: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public angfire: AngularFire, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
    this.fireauth = firebase.auth();
    this.apartments = angfire.database.list('/apartments');
  }


  public addlisting() {
    this.navCtrl.push(AddlistingPage);
  }
}
