import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifierRapportFormComponent } from './planifier-rapport-form.component';

describe('PlanifierRapportFormComponent', () => {
  let component: PlanifierRapportFormComponent;
  let fixture: ComponentFixture<PlanifierRapportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanifierRapportFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanifierRapportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
