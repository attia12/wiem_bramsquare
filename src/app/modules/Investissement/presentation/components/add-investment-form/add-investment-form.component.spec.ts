import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestmentFormComponent } from './add-investment-form.component';

describe('AddInvestmentFormComponent', () => {
  let component: AddInvestmentFormComponent;
  let fixture: ComponentFixture<AddInvestmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInvestmentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInvestmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
