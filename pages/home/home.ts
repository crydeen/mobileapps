import { Component } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AddlistingPage} from '../addlisting/addlisting';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fireauth: any;
  apartments: FirebaseListObservable<any>;
  favoriteObj: Array<Object>;
  list: any;
  listiterator: any;

  constructor(public navCtrl: NavController, public angfire: AngularFire, public alertCtrl: AlertController, public storage: Storage,
    public actionSheetCtrl: ActionSheetController) {
    this.fireauth = firebase.auth();
    this.apartments = angfire.database.list('/apartments');
    this.isFav();
  }

  fav(apartment) {
     this.favoriteObj = [];
     this.favoriteObj.push(apartment);
     console.log('qwq ' + JSON.stringify(this.favoriteObj));
     console.log('apt key ' + apartment.$key);
     this.storage.set(`favorite ${apartment.$key}`, true);
    //  this.storage.set(`favorite ${apartment.$key}`, apartment);
     console.log(`favorite ${apartment.$key}`);
     this.storage.get('favorite ' + apartment.$key).then((data) => {
       console.log(JSON.stringify(data));
       console.log(JSON.stringify(data.address));
     });
     console.log(this.storage);
     console.log(this.apartments);
    //  this.storage.get('favorites').then((data) => {
    //    console.log(JSON.stringify(data));
    //    console.log(JSON.stringify(data[0].address));
    //  });
    //this.storage.set(`favorite`, this.apartments);
  //  else
  //  this.storage.remove(`favorite`);
}
isFav() {
  this.list = [];
  this.apartments.subscribe(items => {
    items.forEach(apartment => {
        this.storage.get('favorite ' + apartment.$key).then((data) => {
          if (data == true) {
            this.list.push(apartment);
          }
          console.log("Hello" + this.list);
         })
    })
  })
  this.listiterator = this.list[Symbol.iterator]();
  }


  public addlisting() {
    this.navCtrl.push(AddlistingPage);
  }
}
