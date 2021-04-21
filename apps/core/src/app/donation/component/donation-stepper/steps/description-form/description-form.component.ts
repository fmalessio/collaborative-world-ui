import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-description-form',
  templateUrl: './description-form.component.html',
  styleUrls: ['./description-form.component.scss'],
})
export class DescriptionFormComponent implements OnInit {

  @Input() descriptionForm: FormControl;

  constructor() { }

  ngOnInit() {}

}
