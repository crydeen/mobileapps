import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the Addlisting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-addlisting',
  templateUrl: 'addlisting.html'
})
export class AddlistingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {}

pictureAdded(){

}


showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Listing Added Successfully',
      duration: 2000,
      position: position
    });
    toast.present(toast);
    this.navCtrl.pop();
  }

}
