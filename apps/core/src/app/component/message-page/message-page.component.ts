import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss'],
})
export class MessagePageComponent implements OnInit {

  @Input() visible: boolean;
  @Input() message: string;

  constructor() {
    this.visible = false;
    this.message = '';
  }

  ngOnInit() { }

}
