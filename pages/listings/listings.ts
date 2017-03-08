import { Component, ViewChild } from '@angular/core';

import { NavController, Content } from 'ionic-angular';

@Component({
  selector: 'page-listings',
  templateUrl: 'listings.html'
})

class E2EPage {
  @ViewChild(Content) content: Content;

  getItems() {
    this.content.resize();
  }
}
export class ListingsPage {

  constructor(public navCtrl: NavController) {

  }

}
