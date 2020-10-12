import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-map-step',
  templateUrl: './map-step.component.html',
  styleUrls: ['./map-step.component.scss'],
})
export class MapStepComponent implements OnInit {

  @Input() mapOpened: boolean;
  @Output() mapOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  toggleMap() {
    this.mapOpened = !this.mapOpened;
    this.mapOpenChange.emit(this.mapOpened);
  }

}
