import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonSlides } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { DonationService } from 'src/app/business-core/service/donation.service';
import { Components } from 'state-stepper/loader';
import { Category } from '../../model/category';
import { Donation, DONATION_STATE } from '../../model/donation';
import { Geolocation } from '../../model/geolocation';

@UntilDestroy()
@Component({
  selector: 'app-donation-stepper',
  templateUrl: './donation-stepper.component.html',
  styleUrls: ['./donation-stepper.component.scss'],
})
export class DonationStepperComponent implements OnInit, AfterViewInit {

  private stateStepper: Components.StateStepper;
  private stepsLegth: number = 5;
  @ViewChild(IonSlides) slides: IonSlides;
  // Forms
  categoryForm: FormGroup;
  descriptionForm: FormGroup;
  trackForm: FormGroup;
  geolocationForm: FormGroup;
  // Forms manager
  private stepsForm: Array<FormGroup> = [];
  private currentPosition: number = 0;
  // Confirmation
  donation: Donation;
  allStepsValid: boolean = false;
  private saved: boolean = false;
  finalMessage: string;

  constructor(
    public alertController: AlertController,
    private fb: FormBuilder,
    private donationService: DonationService,
    private authService: AuthenticationService,
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
      'Es una donación con seguimiento: Recuerda ingresar a "Paquetes pendientes" e imprimir el código QR de la donación y pegarlo en paquete.' :
      'Tu donación ya está disponible, espera que algún colaborador la retire.';
    const alert = await this.alertController.create({
      cssClass: '',
      header: 'Donación creada!',
      subHeader: 'Mundo Colaborativo está agradecido.',
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
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
      this.buildDonation();
    }
    return !invalid;
  }

  private buildDonation() {
    this.donation = {
      geolocation: this.geolocationForm.getRawValue().geolocation,
      follow: this.trackForm.getRawValue().follow,
      amount: this.descriptionForm.getRawValue().amount,
      box: {
        category: this.categoryForm.getRawValue().category,
        description: this.descriptionForm.getRawValue().description
      },
      state: DONATION_STATE.CREATED,
      transactions: [],
      user: {
        uuid: this.authService.getCurrentUserValue().uuid
      }
    };
  }

}

const enum STEPPER_STATE {
  ACTIVE = 'active',
  WARN = 'warn',
  SUCCESS = 'success',
  DANGER = 'danger'
}