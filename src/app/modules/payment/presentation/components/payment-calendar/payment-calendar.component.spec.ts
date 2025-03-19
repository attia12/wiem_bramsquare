import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCalendarComponent } from './payment-calendar.component';

describe('PaymentCalendarComponent', () => {
  let component: PaymentCalendarComponent;
  let fixture: ComponentFixture<PaymentCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
