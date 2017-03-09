import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

goBack(){
  this.navCtrl.pop();
}

}
