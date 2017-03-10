import { Component } from '@angular/core';
import { AddlistingPage } from '../addlisting/addlisting';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})


export class UserPage {

  constructor(public navCtrl: NavController, private nav:NavController, public alertCtrl: AlertController) {

  }

  public addlisting() {
    this.nav.push(AddlistingPage);
  }

  changeemail(){
    let alert = this.alertCtrl.create({
      title: 'Email Change',
      subTitle: 'This will take you to an email change page',
      buttons: ['OK']
    });
    alert.present();
  }
  viewlistings(){
    let alert = this.alertCtrl.create({
      title: 'View Listing',
      subTitle: 'This will take to you the home page, "your listings" segment',
      buttons: ['OK']
    });
    alert.present();
  }

}
