import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {

  loadAPI: Promise<any>;
  map: any;
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(public plt: Platform) {
    this.plt.ready().then((readySource) => {
      //console.log('Platform ready from', readySource);
      //this.showMap();
    });
  }

  ngOnInit() {
    this.loadAPI = new Promise((resolve) => {
      
      //this.loadScript();
    });
  }

  ngAfterViewInit() {
    console.log('Resolving Map...');
    console.log('Platform ready from');
      this.showMap();
  }

  showMap() {
    const location = new google.maps.LatLng(-34.633763, -58.6316297);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

  private loadScript() {
    console.log('preparing to load...')
    let script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBLmWA2P4R8Za1i0YkD2HFQFdvb9usIBNs';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  /*ionViewDidEnter() {
    this.showMap();
  }*/


}
