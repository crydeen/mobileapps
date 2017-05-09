import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
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
  public AptPicture: string = null;
  imageURL: any;
  image2: any;
  postings: FirebaseListObservable<any>;
  email: any;
  public guestPicture: string = null;
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public af: AngularFire, public cameraPlugin: Camera) {
    this.apartments = af.database.list('/apartments');
    this.email = JSON.parse(window.localStorage.getItem('currentuser')).email;
    console.log("Email Check " + this.email);
    this.postings = af.database.list('/postings/' + window.localStorage.getItem(this.email));
  }

  public addlisting(address, rent, bedrooms, bathrooms, squarefeet, pets) {

    firebase.storage().ref('apartments/').child(this.image2).getDownloadURL().then((url) => {
         this.imageURL = url;
         console.log('IMAGE ' + this.imageURL);
       })

    this.postings.push({
      address: address,
      rent: rent,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      squarefeet: squarefeet,
      pets: pets,
      image: this.imageURL
    })

    this.apartments.push({
      address: address,
      rent: rent,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      squarefeet: squarefeet,
      pets: pets,
      image: this.imageURL
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
        this.AptPicture = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  Confirm(){
    let image   : string  = 'Apt-' + new Date().getTime() + '.jpg',
    storageRef  : any,
    parseUpload : any;
    this.image2 = image;

    return new Promise((resolve, reject) =>
          {
             storageRef       = firebase.storage().ref('apartments/' + image);
             parseUpload      = storageRef.putString(this.AptPicture, 'data_url');

             parseUpload.on('state_changed', (_snapshot) =>
             {
                console.log('snapshot progess ' + _snapshot);
             },
             (_err) =>
             {
                reject(_err);
             },
             (success) =>
             {
                resolve(parseUpload.snapshot);
             });
          });
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
