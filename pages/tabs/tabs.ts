import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ListingsPage } from '../listings/listings';
import { MapPage } from '../map/map';
import { SettingsPage} from '../settings/settings'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ListingsPage;
  tab3Root: any = MapPage;
  tab4Root: any = SettingsPage;

  constructor() {

  }
}
