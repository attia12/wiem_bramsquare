import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCostsComponent } from './delivery-costs.component';

describe('DeliveryCostsComponent', () => {
  let component: DeliveryCostsComponent;
  let fixture: ComponentFixture<DeliveryCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryCostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
