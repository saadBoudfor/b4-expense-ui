import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {BucketSummaryComponent} from './bucket-summary.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ItemRepository} from "../../../../../repositories/storages/item-repository.service";
import {of} from "rxjs";

fdescribe('BucketSummaryComponent', () => {
  let component: BucketSummaryComponent;
  let fixture: ComponentFixture<BucketSummaryComponent>;

  let itemRepositoryMock: any = jasmine.createSpyObj(['getByLocation']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BucketSummaryComponent],
      providers: [
        {provide: ItemRepository, useValue: itemRepositoryMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    itemRepositoryMock.getByLocation.and.returnValue(of(fakeDbItems));
    fixture = TestBed.createComponent(BucketSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should read bucket items on create', fakeAsync(() => {
      component.bucket = {id: 88};
      fixture.detectChanges();
      expect(component.bucket.items).toEqual(fakeDbItems);
      expect(itemRepositoryMock.getByLocation).toHaveBeenCalledWith(88);
  }))

});


const fakeDbItems: any = [
  {id: 5},
  {id: 6},
  {id: 7},
]
