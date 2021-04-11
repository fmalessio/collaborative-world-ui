import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PendingToCollectComponent } from './pending-to-collect.component';

describe('PendingToCollectComponent', () => {
  let component: PendingToCollectComponent;
  let fixture: ComponentFixture<PendingToCollectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingToCollectComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PendingToCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
