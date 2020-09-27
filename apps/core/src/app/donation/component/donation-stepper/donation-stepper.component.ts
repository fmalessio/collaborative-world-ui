import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Components } from 'state-stepper/loader';

@Component({
  selector: 'app-donation-stepper',
  templateUrl: './donation-stepper.component.html',
  styleUrls: ['./donation-stepper.component.scss'],
})
export class DonationStepperComponent implements OnInit, AfterViewInit {

  size: string = 'medium';
  private stateStepper: Components.StateStepper;
  private currentPosition: number = 0;
  @ViewChild(IonSlides) slides: IonSlides;

  constructor() {
  }

  ngOnInit() {
    this.stateStepper = document.querySelector('state-stepper');
    this.stateStepper.resetSteps();
  }

  ngAfterViewInit() {
    this.slides.ionSlideNextEnd.subscribe(() => {
      this.moveFromSlide();
    });
    this.slides.ionSlidePrevEnd.subscribe(() => {
      this.moveFromSlide();
    });
  }

  next(fromSlide?: boolean): void {
    this.stateStepper.stepNext(STEPPER_STATE.SUCCESS);
    if (!fromSlide) {
      this.slides.slideNext();
    }
    this.currentPosition += 1;
  }

  back(fromSlide?: boolean): void {
    this.stateStepper.stepBack();
    if (!fromSlide) {
      this.slides.slidePrev();
    }
    this.currentPosition -= 1;
  }

  reset(): void {
    this.stateStepper.resetSteps();
  }

  moveFromSlide() {
    this.slides.getActiveIndex().then((idx: number) => {
      this.move(idx, true);
    });
  }

  move(positionClicked: number, fromSlide?: boolean): void {
    if (positionClicked !== this.currentPosition) {
      (positionClicked < this.currentPosition) ? this.back(fromSlide) : this.next(fromSlide);
    }
  }

  // Steps logic
  setCategory(id: number): void {
    console.log(id);
    this.next();
  }

}

const enum STEPPER_STATE {
  ACTIVE = 'active',
  WARN = 'warn',
  SUCCESS = 'success',
  DANGER = 'danger'
}
