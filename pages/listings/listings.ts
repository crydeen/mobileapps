import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-listings',
  templateUrl: 'listings.html'
})


export class ListingsPage {
  apartments: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public angfire: AngularFire) {
    this.apartments = angfire.database.list('/apartments');
  }

  filter(){
    let alert = this.alertCtrl.create({
      title: 'Filter',
      subTitle: 'This will be a filter for the listings page',
      buttons: ['OK']
    });
    alert.present();
  }

}
