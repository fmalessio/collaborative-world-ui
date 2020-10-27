import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { Components } from 'state-stepper/loader';
import { Category } from '../../model/category';
import { Geolocation } from '../../model/geolocation';

@Component({
  selector: 'app-donation-stepper',
  templateUrl: './donation-stepper.component.html',
  styleUrls: ['./donation-stepper.component.scss'],
})
export class DonationStepperComponent implements OnInit, AfterViewInit {

  stepperSize: string = 'medium';
  mapOpened: boolean = false;
  private stateStepper: Components.StateStepper;
  private stepsLegth: number = 5;
  @ViewChild(IonSlides) slides: IonSlides;
  // Forms
  private categoryForm: FormGroup;
  private descriptionForm: FormGroup;
  private trackForm: FormGroup;
  private geolocationForm: FormGroup;
  // Forms manager
  private stepsForm: Array<FormGroup> = [];
  private currentPosition: number = 0;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.stateStepper = document.querySelector('state-stepper');
    this.stateStepper.resetSteps();
    this.madeForms();
    this.pushFormsInOrder();
  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  }

  next(): void {
    const state = this.checkStateBeforeNext();
    this.slides.lockSwipes(false);
    this.stateStepper.stepNext(state);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    this.currentPosition += 1;
  }

  canNext(): boolean {
    return !this.mapOpened && this.currentPosition < this.stepsLegth;
  }

  back(): void {
    this.slides.lockSwipes(false);
    this.stateStepper.stepBack();
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
    this.currentPosition -= 1;
  }

  canBack(): boolean {
    return !this.mapOpened && this.currentPosition !== 0;
  }

  setMapOpened(mapOpened: boolean) {
    this.mapOpened = mapOpened;
  }

  setCategory(category: Category): void {
    this.categoryForm.controls['category'].setValue(category);
    this.next();
  }

  setLocation(geolocation: Geolocation): void {
    this.geolocationForm.controls['geolocation'].setValue(geolocation);
  }

  private madeForms(): void {
    // Category
    this.categoryForm = this.fb.group({
      category: [null, Validators.required]
    });
    // Description
    this.descriptionForm = this.fb.group({
      description: '',
      ammount: [1,
        [Validators.required,
        Validators.min(1),
        Validators.max(9999)]]
    });
    // Track
    this.trackForm = this.fb.group({
      follow: [null, Validators.required]
    });
    // Location
    this.geolocationForm = this.fb.group({
      geolocation: [null, Validators.required]
    });
  }

  private pushFormsInOrder() {
    this.stepsForm.push(...
      [this.categoryForm,
      this.descriptionForm,
      this.trackForm,
      this.geolocationForm]);
  }

  private checkStateBeforeNext(): STEPPER_STATE {
    let state = STEPPER_STATE.SUCCESS;
    if (this.stepsForm[this.currentPosition] &&
      !this.stepsForm[this.currentPosition].valid) {
      state = STEPPER_STATE.DANGER;
    }
    return state;
  }

}

const enum STEPPER_STATE {
  ACTIVE = 'active',
  WARN = 'warn',
  SUCCESS = 'success',
  DANGER = 'danger'
}