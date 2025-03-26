import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionReportsComponent } from './commission-reports.component';

describe('CommissionReportsComponent', () => {
  let component: CommissionReportsComponent;
  let fixture: ComponentFixture<CommissionReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommissionReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommissionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
