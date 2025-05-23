import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendAnalysisComponent } from './trend-analysis.component';

describe('TrendAnalysisComponent', () => {
  let component: TrendAnalysisComponent;
  let fixture: ComponentFixture<TrendAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
