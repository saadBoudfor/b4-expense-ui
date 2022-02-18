import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetItemExpirationModalComponent } from './set-item-expiration-modal.component';

describe('SetItemExpirationModalComponent', () => {
  let component: SetItemExpirationModalComponent;
  let fixture: ComponentFixture<SetItemExpirationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetItemExpirationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetItemExpirationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
