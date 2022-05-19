import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeStorageComponent } from './welcome-storage.component';

describe('WelcomeStorageComponent', () => {
  let component: WelcomeStorageComponent;
  let fixture: ComponentFixture<WelcomeStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
