import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileLateralMenuComponent } from './mobile-lateral-menu.component';

describe('MobileLateralMenuComponent', () => {
  let component: MobileLateralMenuComponent;
  let fixture: ComponentFixture<MobileLateralMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileLateralMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileLateralMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
