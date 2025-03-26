import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaylistComponent } from './paylist.component';

describe('PaylistComponent', () => {
  let component: PaylistComponent;
  let fixture: ComponentFixture<PaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
