import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
//import { Camera } from '@ionic-native/camera';
import { Camera } from 'ionic-native';
import firebase from 'firebase';

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
  public guestPicture: string = null;
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public af: AngularFire, public cameraPlugin: Camera) {
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

pictureAdded(position: string, name, data){

  Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });

  let toast = this.toastCtrl.create({
    message: 'Picture Added',
    duration: 2000,
    position: position
  });
  toast.present(toast);
}

// takePicture(){
//   this.cameraPlugin.getPicture({
//    quality : 95,
//    destinationType : this.cameraPlugin.DestinationType.DATA_URL,
//    sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
//    allowEdit : true,
//    encodingType: this.cameraPlugin.EncodingType.PNG,
//    targetWidth: 500,
//    targetHeight: 500,
//    saveToPhotoAlbum: true
//   }).then(imageData => {
//    this.guestPicture = imageData;
//  }, error => {
//    console.log("ERROR -> " + JSON.stringify(error));
//  });
// }

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
