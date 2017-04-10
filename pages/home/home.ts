import { Component } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { AddlistingPage} from '../addlisting/addlisting';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';
  apartment: string = "favorites";
  songs: FirebaseListObservable<any>;
  apartments: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, private nav:NavController, private auth: AuthService, af: AngularFire, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
    let info = this.auth.getUserInfo();
    this.username = info.name;
    this.email = info.email;
    this.songs = af.database.list('/songs');
    this.apartments = af.database.list('/apartments');
  }

  public addlisting() {
    this.nav.push(AddlistingPage);
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage)
    });
  }

}
