import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Geolocation } from 'ionic-native';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { googlemaps } from 'googlemaps';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapInitialised: boolean = false;
  apiKey: 'AIzaSyC25B2JZwzrh3n3MvgNTgccUhc2EhGTU-g';
  markers: FirebaseListObservable<any>;
  center: any;

  constructor(public nav: NavController, public navParams: NavParams, public connectivityService: ConnectivityService, public angfire: AngularFire) {
    this.loadGoogleMaps();
    this.markers = angfire.database.list('/apartments');
    this.center = this.navParams.get('center');
    console.log("Center on Map Page: " + this.center + "Nav Param: " + this.navParams.get('center'));
  }

  // ionViewDidLoad() {
  //   this.getMarkers(map);
  // }

  getMarkers(map) {
    var geocoder = new google.maps.Geocoder();
    let count: number = 0;
    let list = new Array(100);
    this.markers.subscribe(items => {
      console.log(items);
      items.forEach(addresses => {
        let count: number = 0;
        geocoder.geocode({'address': addresses.address + " Oxford, MS"}, function(results, status) {
          if (status === 'OK') {
            console.log(addresses.address)
            console.log("Space after")
            let marker = new google.maps.Marker({
              map: map,
              //position: new google.maps.LatLng(34.365712, -89.560150)
              position: results[0].geometry.location
            });
            let infoWindow = new google.maps.InfoWindow({
              content: addresses.address
            });
            google.maps.event.addListener(marker, 'click', () => {
              infoWindow.open(this.map, marker);
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status + "For apartment " + addresses.address);
          }
          console.log(count);
          count++;
        });
        list[count] = addresses.address;
        console.log('Address:', list[count]);
      });
    });
  }

  addMarker(){

  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    // position: this.map.getCenter()
    position: new google.maps.LatLng(34.365712, -89.560150)
  });

  let content = "<h4>Information!</h4>";

  this.addInfoWindow(marker, content);

}

  loadGoogleMaps(){
    this.addConnectivityListeners();

  if (typeof google == "undefined" || typeof google.maps == "undefined") {
    console.log("Google maps Javascript needs to be loaded");
    this.disableMap();

    if (this.connectivityService.isOnline()){
      console.log("online, loading map");

      //Load the SDK
      window['mapinit'] = () => {
        this.initMap();
        this.enableMap();
      }

      let script = document.createElement("script");
      script.id = "googleMaps";

      if (this.apiKey){
        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
      }

      document.body.appendChild(script);
    }
  }
  else {
    if(this.connectivityService.isOnline()) {
      console.log("showing map");
      this.initMap();
      this.enableMap();
    }
    else {
      console.log("disabling map");
      this.disableMap();
    }
  }
  }

  initMap() {
    this.mapInitialised = true;

    Geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(34.365038, -89.53897);
      if (this.center != undefined) {
        latLng = this.center
      }
      //If we want to do Geolocation
      //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.getMarkers(this.map);
    });


    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }


  disableMap() {
    console.log("diable map");
  }

  enableMap(){
    console.log("enable map");
  }

  addConnectivityListeners() {
    let onOnline = () => {

      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){

          this.loadGoogleMaps();

        } else {
          if(!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);
    };

    let onOffline = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
  }


addInfoWindow(marker, content){

  let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });

}

}
