import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {StorageDetailsComponent} from './storage-details.component';
import {NGXLogger} from "ngx-logger";
import {Router} from "@angular/router";
import {StorageRepository} from "../../../repositories/storage-repository.service";
import {StorageService} from "../../../services/storage.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Storage} from "../../../data-models/Storage";
import {of} from "rxjs";
import {Item} from "../../../data-models/Item";

fdescribe('StorageDetailsComponent', () => {
  let component: StorageDetailsComponent;
  let fixture: ComponentFixture<StorageDetailsComponent>;
  let loggerMock: any = jasmine.createSpyObj(['debug', 'error', 'info']);
  let storageServiceMock: any = jasmine.createSpyObj(['getSavedStorageId']);
  let storageRepositoryMock: any = jasmine.createSpyObj(['get']);
  let routerMock: any = jasmine.createSpyObj(['navigate']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StorageDetailsComponent],
      providers: [
        {provide: NGXLogger, useValue: loggerMock},
        {provide: StorageService, useValue: storageServiceMock},
        {provide: StorageRepository, useValue: storageRepositoryMock},
        {provide: Router, useValue: routerMock},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    routerMock.navigate.and.returnValue(Promise.resolve({redirect: true}));
    storageServiceMock.getSavedStorageId.and.returnValue(7);
    storageRepositoryMock.get.and.returnValue(of({
      id: 7
    } as Storage))
    loggerMock.debug.and.callFake((data: any) => console.debug(data))
    fixture = TestBed.createComponent(StorageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and fetch selected storage data', () => {
    expect(component).toBeTruthy();
    expect(component.storage).toEqual({id: 7})
  });

  it('should redirect to new item page when request addNewItem', fakeAsync(() => {
    component.addNewItem({id: 6});
    expect(routerMock.navigate).toHaveBeenCalledWith(['/storage/item/new'], {queryParams: {bucketId: 6}});
  }))

  it('should redirect to new bucket page when request addBucket function', fakeAsync(() => {
    component.newBucket()
    expect(routerMock.navigate).toHaveBeenCalledWith(['/storage/bucket/new'], {queryParams: {storageId: 7}});
  }))

  it('should open details success when click on item', fakeAsync(() => {
    component.openDetails(item);
    expect(loggerMock.info).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/storage/item'], {queryParams: {itemId: 5}});
  }))
});

const item: Item = {
  "id": 5,
  "quantity": 6,
  "expense": {
    "name": "Glasstep",
    "expenseLines": [],
    "place": {
      "id": 45,
      "name": "restau u",
      "type": "STORE",
      "address": {}
    }
  }
}
