import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSettingsModalComponent } from './notification-settings-modal.component';

describe('NotificationSettingsModalComponent', () => {
  let component: NotificationSettingsModalComponent;
  let fixture: ComponentFixture<NotificationSettingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationSettingsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
