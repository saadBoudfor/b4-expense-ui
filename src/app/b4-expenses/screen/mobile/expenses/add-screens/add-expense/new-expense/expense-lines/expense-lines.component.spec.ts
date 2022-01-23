import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseLinesComponent } from './expense-lines.component';

describe('ExpenseLinesComponent', () => {
  let component: ExpenseLinesComponent;
  let fixture: ComponentFixture<ExpenseLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseLinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
