import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketSummaryComponent } from './bucket-summary.component';

describe('BucketSummaryComponent', () => {
  let component: BucketSummaryComponent;
  let fixture: ComponentFixture<BucketSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BucketSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
