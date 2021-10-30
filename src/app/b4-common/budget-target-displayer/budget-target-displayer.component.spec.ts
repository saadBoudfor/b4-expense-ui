import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTargetDisplayerComponent } from './budget-target-displayer.component';

describe('BudgetTargetDisplayerComponent', () => {
  let component: BudgetTargetDisplayerComponent;
  let fixture: ComponentFixture<BudgetTargetDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetTargetDisplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetTargetDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
