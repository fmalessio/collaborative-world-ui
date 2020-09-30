import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { Components } from 'state-stepper/loader';
import { Category } from '../../model/category';

@Component({
  selector: 'app-donation-stepper',
  templateUrl: './donation-stepper.component.html',
  styleUrls: ['./donation-stepper.component.scss'],
})
export class DonationStepperComponent implements OnInit, AfterViewInit {

  stepperSize: string = 'medium';
  private stateStepper: Components.StateStepper;
  private stepsLegth: number;
  @ViewChild(IonSlides) slides: IonSlides;
  // Forms
  private categoryForm: FormGroup;
  private descriptionForm: FormGroup;
  private stepsForm: Array<FormGroup> = [];
  private currentPosition: number = 0;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.stateStepper = document.querySelector('state-stepper');
    this.stateStepper.resetSteps();
    this.madeForm();
  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
    this.slides.length().then(
      (size: number) => this.stepsLegth = size
    );
  }

  next(): void {
    let state = this.stepsForm[this.currentPosition].valid ?
      STEPPER_STATE.SUCCESS : STEPPER_STATE.DANGER;
    this.slides.lockSwipes(false);
    this.stateStepper.stepNext(state);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    this.currentPosition += 1;
  }

  canNext(): boolean {
    return this.currentPosition < this.stepsLegth;
  }

  back(): void {
    this.slides.lockSwipes(false);
    this.stateStepper.stepBack();
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
    this.currentPosition -= 1;
  }

  canBack(): boolean {
    return this.currentPosition !== 0;
  }

  // Form logic
  setCategory(category: Category): void {
    this.categoryForm.controls['category'].setValue(category);
    this.next();
  }

  private madeForm(): void {
    // Category
    this.categoryForm = this.fb.group({
      category: [null, Validators.required]
    });
    this.stepsForm.push(this.categoryForm);
    // Description
    this.descriptionForm = this.fb.group({
      text: '',
      text2: [null, Validators.required]
    });
    this.stepsForm.push(this.descriptionForm);
  }

}

const enum STEPPER_STATE {
  ACTIVE = 'active',
  WARN = 'warn',
  SUCCESS = 'success',
  DANGER = 'danger'
}