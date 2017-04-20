import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ListingsPage } from '../listings/listings';
import { MapPage } from '../map/map';
import { UserPage } from '../user/user';
import { SettingsPage} from '../settings/settings';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ListingsPage;
  tab3Root: any = MapPage;
  tab4Root: any = UserPage;
  tab5Root: any = SettingsPage;

  constructor(private navCtrl: NavController) {
    if (!this.isLoggedin()) {
      console.log('You are not logged in');
      this.navCtrl.setRoot(LoginPage);
  }

}
isLoggedin() {
  if (window.localStorage.getItem('currentuser')) {
    return true;
  }
}
}
