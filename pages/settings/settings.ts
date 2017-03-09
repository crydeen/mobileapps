import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, private nav:NavController) {

  }

  public about() {
    this.nav.push(AboutPage);
  }
}
