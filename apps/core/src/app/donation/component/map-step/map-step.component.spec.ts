import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapStepComponent } from './map-step.component';

describe('MapStepComponent', () => {
  let component: MapStepComponent;
  let fixture: ComponentFixture<MapStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapStepComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
