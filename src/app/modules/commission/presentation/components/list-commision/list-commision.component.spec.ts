import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommisionComponent } from './list-commision.component';

describe('ListCommisionComponent', () => {
  let component: ListCommisionComponent;
  let fixture: ComponentFixture<ListCommisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCommisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCommisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
