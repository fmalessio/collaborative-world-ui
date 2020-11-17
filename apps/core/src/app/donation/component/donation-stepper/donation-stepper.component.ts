import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonSlides } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DonationService } from 'src/app/business-core/service/donation.service';
import { Components } from 'state-stepper/loader';
import { Category } from '../../model/category';
import { Donation } from '../../model/donation';
import { Geolocation } from '../../model/geolocation';

@UntilDestroy()
@Component({
  selector: 'app-donation-stepper',
  templateUrl: './donation-stepper.component.html',
  styleUrls: ['./donation-stepper.component.scss'],
})
export class DonationStepperComponent implements OnInit, AfterViewInit {

  stepperSize: string = 'medium';
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
  // Confirmation
  private donation: Donation;
  allStepsValid: boolean = false;
  resume: Array<{ label: string, value: string }> = [];
  private saved: boolean = false;
  finalMessage: string;

  constructor(
    public alertController: AlertController,
    private fb: FormBuilder,
    private donationService: DonationService,
    private router: Router) {
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
    this.allStepsValid = this.checkAllStepsValid();
    const state = this.checkStateBeforeNext();
    this.slides.lockSwipes(false);
    this.stateStepper.stepNext(state);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    this.currentPosition += 1;
  }

  canNext(): boolean {
    return this.currentPosition < this.stepsLegth &&
      !this.saved;
  }

  back(): void {
    this.slides.lockSwipes(false);
    this.stateStepper.stepBack();
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
    this.currentPosition -= 1;
  }

  canBack(): boolean {
    return this.currentPosition !== 0 &&
      !this.saved;
  }

  setCategory(category: Category): void {
    this.categoryForm.controls['category'].setValue(category);
    this.next();
  }

  setLocation(geolocation: Geolocation): void {
    this.geolocationForm.controls['geolocation'].setValue(geolocation);
  }

  save(): void {
    this.donationService.save(this.donation)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.showFinalMessage();
      }, (error) => console.error(JSON.stringify(error)));
  }

  async showFinalMessage() {
    const message = this.donation.follow ?
      'Es una donación con seguimiento: Recuerda ingresar a "Finalizar donación" e imprimir el código QR de la donación y pegarlo en paquete.' :
      'Tu donación ya está disponible, espera que algún colaborador la retire.';
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Donación creada!',
      subHeader: 'Mundo Colaborativo está agradecido.',
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          console.log('Confirm Okay');
          this.router.navigate(["/folder/Inbox"]);
        }
      }]
    });
    await alert.present();
  }

  private madeForms(): void {
    // Category
    this.categoryForm = this.fb.group({
      category: [null, Validators.required]
    });
    // Description
    this.descriptionForm = this.fb.group({
      description: '',
      amount: [1,
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

  private checkAllStepsValid(): boolean {
    let invalid = this.stepsForm.find(element => element.invalid);
    if (!invalid) {
      this.buildResume();
    }
    return !invalid;
  }

  private buildResume() {
    this.donation = {
      geolocation: this.geolocationForm.getRawValue().geolocation,
      follow: this.trackForm.getRawValue().follow,
      amount: this.descriptionForm.getRawValue().amount,
      box: {
        category: this.categoryForm.getRawValue().category,
        description: this.descriptionForm.getRawValue().description
      }
    };
    this.resume = [];
    this.resume.push({ label: 'Categoría', value: this.donation.box.category.name });
    this.resume.push({ label: 'Cantidad', value: this.donation.amount.toString() });
    this.resume.push({ label: 'Descripción', value: this.donation.box.description });
    this.resume.push({ label: 'Con seguimiento', value: this.donation.follow ? 'Sí' : 'No' });
    this.resume.push({ label: 'Dirección', value: this.donation.geolocation.address });
  }

}

const enum STEPPER_STATE {
  ACTIVE = 'active',
  WARN = 'warn',
  SUCCESS = 'success',
  DANGER = 'danger'
}