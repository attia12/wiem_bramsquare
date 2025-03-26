import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportItemComponent } from './rapport-item.component';

describe('RapportItemComponent', () => {
  let component: RapportItemComponent;
  let fixture: ComponentFixture<RapportItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapportItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
