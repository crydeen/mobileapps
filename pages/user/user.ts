import { Component } from '@angular/core';
import { AddlistingPage } from '../addlisting/addlisting';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})


export class UserPage {

  constructor(public navCtrl: NavController, private nav:NavController) {

  }

  public addlisting() {
    this.nav.push(AddlistingPage);
  }

}
