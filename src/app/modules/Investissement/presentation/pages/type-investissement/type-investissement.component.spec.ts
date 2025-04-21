import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeInvestissementComponent } from './type-investissement.component';

describe('TypeInvestissementComponent', () => {
  let component: TypeInvestissementComponent;
  let fixture: ComponentFixture<TypeInvestissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeInvestissementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeInvestissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
