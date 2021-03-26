import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Geolocation } from '../../../../model/geolocation';

@Component({
  selector: 'app-location-step',
  templateUrl: './location-step.component.html',
  styleUrls: ['./location-step.component.scss'],
})
export class LocationStepComponent implements OnInit {

  @Output() onLocationChange: EventEmitter<Geolocation>;
  geolocation: Geolocation;
  searcherOpen: boolean;
  searching: boolean;

  constructor() {
    this.onLocationChange = new EventEmitter();
    this.searcherOpen = true;
    this.searching = false;
  }

  ngOnInit() { }

  setLocation(geolocation: Geolocation): void {
    console.log('geolocation arrive...');
    this.searching = false;
    this.geolocation = geolocation;
    this.searcherOpen = false;
    this.onLocationChange.emit(this.geolocation);
  }

  changeLocation() {
    this.geolocation = undefined;
    this.searcherOpen = true;
  }

  searchStarted() {
    this.searching = true;
  }

}
