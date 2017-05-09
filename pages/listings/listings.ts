import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Storage } from '@ionic/storage';
import { MapPage } from '../map/map';
import { googlemaps } from 'googlemaps';
import firebase from 'firebase';

declare var google;

@Component({
  selector: 'page-listings',
  templateUrl: 'listings.html'
})


export class ListingsPage {
  apartments: FirebaseListObservable<any>;
  apartmentList: any;
  loadedApartmentList: any;
  fireauth: any;
  center:any;
  geocoder: any;
  apartmentFilter: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public angfire: AngularFire) {
    this.apartments = angfire.database.list('/apartments');
    this.fireauth = firebase.auth();
    this.apartmentFilter = firebase.database().ref('/apartments');
    this.apartmentFilter.on('value', apartmentList => {
      let apartmentArray = [];
      apartmentList.forEach( apartment => {
        apartmentArray.push(apartment.val());
      });
      this.apartmentList = apartmentArray;
      this.loadedApartmentList = apartmentArray;
      console.log("Apartment Array: " + apartmentArray);
    });
  }

  intializeItems() {
    this.apartmentList = this.loadedApartmentList;
  }
  getItems(searchbar) {
    this.intializeItems();
    var q = searchbar.srcElement.value;
    if (!q) {
      return;
    }
    this.apartmentList = this.apartmentList.filter((v) => {
      if (v.address && q) {
        if (v.address.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    })
  }

  filter(){
    let alert = this.alertCtrl.create({
      title: 'Filter',
      subTitle: 'This will be a filter for the listings page',
      buttons: ['OK']
    });
    alert.present();
  }

  fav(apartment) {
    console.log("Testing before comparison " + `favorite ${apartment.$key}`)
    let item = window.localStorage.getItem(`favorite ${apartment.$key}`)
       if (item == "True") {
         window.localStorage.setItem(`favorite ${apartment.$key}`, "False")
           console.log(`favorite ${apartment.$key}` + " set to false");
       }
       else {
         window.localStorage.setItem(`favorite ${apartment.$key}`, "True");
       }
     console.log('apt key ' + apartment.$key);
    console.log(window.localStorage);
     console.log(this.apartments);

     this.isFav();
}
isFav() {
  let email = this.fireauth.currentUser.email
  let ref = firebase.database().ref("users/" + window.localStorage.getItem(email));
  ref.set({}).then((data) => {
    console.log("List has been emptied")
  })
  this.apartments.subscribe(items => {
    items.forEach(apartment => {
      let data = window.localStorage.getItem('favorite ' + apartment.$key)
          if (data == "True") {
            ref.push(apartment).then((update) => {
              console.log("Apartment pushed on to list: " + apartment.$key)
            })
          }
         })
    })
  }
  map(apartment) {
    this.geocoder = new google.maps.Geocoder();
    let nav = this.navCtrl;
    this.geocoder.geocode({'address': apartment.address + " Oxford, MS"}, function(results, status) {
      if (status === 'OK') {
          this.center =  results[0].geometry.location
          console.log("Center: " + this.center)
          nav.push(MapPage, {
             center: this.center
          });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    })

    console.log("Right before push " + this.center);

  }

}
