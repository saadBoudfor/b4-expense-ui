import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesLinesListComponent } from './expenses-lines-list.component';

describe('ExpensesLinesListComponent', () => {
  let component: ExpensesLinesListComponent;
  let fixture: ComponentFixture<ExpensesLinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesLinesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesLinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
