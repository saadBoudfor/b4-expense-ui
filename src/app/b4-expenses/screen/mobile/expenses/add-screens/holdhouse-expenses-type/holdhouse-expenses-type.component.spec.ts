import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldhouseExpensesTypeComponent } from './holdhouse-expenses-type.component';

describe('HoldhouseExpensesTypeComponent', () => {
  let component: HoldhouseExpensesTypeComponent;
  let fixture: ComponentFixture<HoldhouseExpensesTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoldhouseExpensesTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldhouseExpensesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
