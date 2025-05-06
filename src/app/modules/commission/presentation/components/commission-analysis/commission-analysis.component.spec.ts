import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionAnalysisComponent } from './commission-analysis.component';

describe('CommissionAnalysisComponent', () => {
  let component: CommissionAnalysisComponent;
  let fixture: ComponentFixture<CommissionAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommissionAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommissionAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
