import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInvestmentTypeComponent } from './create-investment-type.component';

describe('CreateInvestmentTypeComponent', () => {
  let component: CreateInvestmentTypeComponent;
  let fixture: ComponentFixture<CreateInvestmentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInvestmentTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInvestmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
