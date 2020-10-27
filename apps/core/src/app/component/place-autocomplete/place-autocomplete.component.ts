import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { Geolocation } from 'src/app/donation/model/geolocation';

declare var google: any;

@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.scss'],
})
export class PlaceAutocompleteComponent implements OnInit {

  @Output() onLocationChange: EventEmitter<Geolocation>;
  @Output() onSearchStart: EventEmitter<any>;
  googleAutocomplete: any;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  private geocoder: any;

  constructor(
    public zone: NgZone
  ) {
    this.googleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder();
    this.onLocationChange = new EventEmitter();
    this.onSearchStart = new EventEmitter();
  }

  ngOnInit() { }

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.googleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          if (!predictions) {
            return;
          }
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  selectSearchResult(item) {
    this.onSearchStart.emit();
    this.geocodeAddress(item.description);
    this.clearAutocomplete();
  }

  clearAutocomplete() {
    this.autocompleteItems = [];
    this.autocomplete.input = '';
  }

  geocodeAddress(location: string): void {
    this.geocoder.geocode({ 'address': location }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log('Geocoding complete!');
        const result = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
          address: location
        };
        this.onLocationChange.emit(result);
      } else {
        console.error('Error - ', results, ' & Status - ', status);
      }
    });
  }

}