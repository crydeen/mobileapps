import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

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
  apartments: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public af: AngularFire) {
    this.apartments = af.database.list('/apartments');
  }

  public addlisting(address, rent, bedrooms, bathrooms, squarefeet, pets) {
    this.apartments.push({
      address: address,
      rent: rent,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      squarefeet: squarefeet,
      pets: pets
    }).then( newListing => {
      this.navCtrl.pop();
    }, error => {
      console.log(error);
    });
}

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
