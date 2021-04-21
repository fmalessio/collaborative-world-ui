import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationStepComponent } from './location-step.component';

describe('LocationStepComponent', () => {
  let component: LocationStepComponent;
  let fixture: ComponentFixture<LocationStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationStepComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
