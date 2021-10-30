import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineBudgetComponent } from './define-budget.component';

describe('DefineBudgetComponent', () => {
  let component: DefineBudgetComponent;
  let fixture: ComponentFixture<DefineBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
