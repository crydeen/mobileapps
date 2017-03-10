import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-listings',
  templateUrl: 'listings.html'
})


export class ListingsPage {

  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {

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
