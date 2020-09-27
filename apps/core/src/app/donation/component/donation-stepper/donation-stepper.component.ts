import { Component, OnInit } from '@angular/core';
import { Components } from 'state-stepper/loader';

@Component({
  selector: 'app-donation-stepper',
  templateUrl: './donation-stepper.component.html',
  styleUrls: ['./donation-stepper.component.scss'],
})
export class DonationStepperComponent implements OnInit {

  size: string = 'medium';
  states: Map<number, STEPPER_STATE> = new Map<number, STEPPER_STATE>();
  private stateStepper: Components.StateStepper;
  private currentPosition: number = 0;

  constructor() {
  }

  ngOnInit() {
    this.stateStepper = document.querySelector('state-stepper');
    this.stateStepper.resetSteps();
  }

  next(): void {
    this.stateStepper.stepNext(STEPPER_STATE.SUCCESS);
    this.currentPosition += 1;
    console.log(this.currentPosition);
  }

  back(): void {
    this.stateStepper.stepBack();
    this.currentPosition -= 1;
    console.log(this.currentPosition);
  }

  reset(): void {
    this.stateStepper.resetSteps();
  }

  move(positionClicked: number): void {
    if (positionClicked !== this.currentPosition) {
      (positionClicked < this.currentPosition) ? this.back() : this.next();
    }
  }

}

const enum STEPPER_STATE {
  ACTIVE = 'active',
  WARN = 'warn',
  SUCCESS = 'success',
  DANGER = 'danger'
}
