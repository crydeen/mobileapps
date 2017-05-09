import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { NavController, AlertController, ActionSheetController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AddlistingPage} from '../addlisting/addlisting';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { TabsPage } from '../tabs/tabs';
import { MapPage } from '../map/map';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';
import { googlemaps } from 'googlemaps';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fireauth: any;
  apartments: FirebaseListObservable<any>;
  favorites: FirebaseListObservable<any>;
  users: FirebaseListObservable<any>;
  postings: FirebaseListObservable<any>;
  favoriteObj: Array<Object>;
  list: any;
  listiterator: any;
  firestore = firebase.storage();
  imgsrc: any;
  geocoder: any;
  center:any;
  user: any;
  admin: any;
  user_id: any;
  email: any;
  apartment:any;
  selection:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angfire: AngularFire, public alertCtrl: AlertController, public storage: Storage,
    public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController) {
      this.fireauth = firebase.auth();
      this.apartments = angfire.database.list('/apartments');
      this.users = angfire.database.list('/users');
      this.email = JSON.parse(window.localStorage.getItem('currentuser')).email;
      console.log("Email Check " + this.email);
      this.favorites = angfire.database.list('/users/' + window.localStorage.getItem(this.email));
      this.postings = angfire.database.list('/postings/' + window.localStorage.getItem(this.email));
      this.selection = this.navParams.get('selection');
      if (this.selection != undefined) {
        this.apartment = "user-listings";
      }
      else {
        this.apartment= 'favorites';
      }
      this.isFav();
  }

  getImage(apartment) {
    this.firestore.ref('apartments/').child(apartment.image).getDownloadURL().then((url) => {
        this.imgsrc = url;
        console.log('IMAGE ' + this.imgsrc);
    })
  }

  fav(apartment) {
    console.log("Testing before comparison " + `favorite ${apartment.$key}`)
    let item = window.localStorage.getItem(`favorite ${apartment.$key}`)
       if (item == "True") {
         window.localStorage.setItem(`favorite ${apartment.$key}`, "False")
           console.log(`favorite ${apartment.$key}` + " set to false");
           let toast = this.toastCtrl.create({
             message: apartment.address + " was removed from your favorites",
             duration: 2000,
           });
           toast.present(toast);
       }
       else {
         window.localStorage.setItem(`favorite ${apartment.$key}`, "True");
         let toast = this.toastCtrl.create({
           message: apartment.address + " was added to your favorites",
           duration: 2000,
         });
         toast.present(toast);
       }
     console.log('apt key ' + apartment.$key);
    console.log(window.localStorage);
     console.log(this.apartments);
    this.isFav()
}
deletefav(apartment) {
  console.log("Apartment Key Delete "+apartment.$key)
  console.log("Storage "+ JSON.stringify(window.localStorage));
  let holder = window.localStorage.getItem(`favorite list ${apartment.$key}`)
  console.log("holder value " + holder + "String value " + `favorite list ${apartment.$key}`);
  window.localStorage.setItem('favorite ' + holder, "False")
  window.localStorage.removeItem(`favorite list ${apartment.$key}`);
  let toast = this.toastCtrl.create({
    message: apartment.address + " was removed from your favorites",
    duration: 2000,
  });
  toast.present(toast);
  this.isFav();
  // let ref = firebase.database().ref("users/" + window.localStorage.getItem(this.email));
  // ref.set({}).then((data) => {
  //   console.log("List has been emptied")
  // })
  // this.favorites.subscribe(items => {
  //   items.forEach(apartments => {
  //     let data = window.localStorage.getItem('favorite list ' + apartments.$key)
  //         if (data) {
  //           ref.push(data).then((update) => {
  //
  //             console.log("Apartment pushed on to list: " + apartments.$key)
  //             console.log("Apartment pushed on to list: " + apartment.$key)
  //           })
  //         }
  //        })
  //   })
}
isFav() {
  // let email = this.fireauth.currentUser.email
  let ref = firebase.database().ref("users/" + window.localStorage.getItem(this.email));
  ref.set({}).then((data) => {
    console.log("List has been emptied")
  })
  this.apartments.subscribe(items => {
    items.forEach(apartment => {
      let data = window.localStorage.getItem('favorite ' + apartment.$key)
          if (data == "True") {
            let id = ref.push(apartment).key
            console.log("ID generated" + id)
            window.localStorage.setItem('favorite list '+ id, apartment.$key)
            console.log("List id: " + 'favorite list '+ id + "Apartment key isFav: " + apartment.$key)

            // .then((update) => {
            //
            //   console.log("Apartment pushed on to list: " + apartment.$key)
            //   console.log("Reference ID " + ref.push(apartment).key);
            // })
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

  public addlisting() {
    let ref = firebase.database().ref("users/" + window.localStorage.getItem(this.email));
    ref.set({}).then((data) => {
      console.log("List has been emptied")
    })
    this.navCtrl.push(AddlistingPage);
  }
}
