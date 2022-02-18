import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {NewStorageComponent} from './new-storage.component';
import {StorageRepository} from "../../../repositories/storage-repository.service";
import {StorageService} from "../../../services/storage.service";
import {ConfirmationService} from "../../../../b4-common/services/confirmation.service";
import {NGXLogger} from "ngx-logger";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {of, throwError} from "rxjs";
import {By} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

fdescribe('NewStorageComponent', () => {
  let component: NewStorageComponent;
  let fixture: ComponentFixture<NewStorageComponent>;

  // mocks:
  const storageRepositoryMock: any = jasmine.createSpyObj(['save']);
  const storageServiceMock: any = jasmine.createSpyObj(['isValid', 'updateSelectedStorageId']);
  const confirmationServiceMock: any = jasmine.createSpyObj(['open']);
  const loggerMock: any = jasmine.createSpyObj(['info', 'error']);
  const matSnackBarMock: any = jasmine.createSpyObj(['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewStorageComponent],
      imports: [FormsModule],
      providers: [
        {provide: StorageRepository, useValue: storageRepositoryMock},
        {provide: StorageService, useValue: storageServiceMock},
        {provide: ConfirmationService, useValue: confirmationServiceMock},
        {provide: MatSnackBar, useValue: matSnackBarMock},
        {provide: NGXLogger, useValue: loggerMock},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create empty storage on init component', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.storage.buckets).toBeTruthy();
    expect(component.storage.buckets?.length).toEqual(1);
  }));

  it('should check storage success', fakeAsync(() => {
    // Given
    storageServiceMock.isValid.and.returnValue(of({
      valid: true, usedName: false
    }))

    // when
    component.checkStorage();
    tick();

    // then
    expect(component.isStorageValid).toBeTrue();
    expect(component.isNameAlreadyUsed).toBeFalse();
    expect(storageServiceMock.isValid).toHaveBeenCalled();
  }))

  it('should open confirmation screen on storage success', fakeAsync(() => {
    // given
    storageRepositoryMock.save.and.returnValue(of({
      id: 45,
      name: 'name'
    }))

    // when
    component.storage = {
      name: 'name', buckets: [{name: 'b_name'}]
    }
    component.save();
    tick();

    // then
    expect(confirmationServiceMock.open).toHaveBeenCalledTimes(1);

  }))

  it('should open confirmation snackbar on storage failed', fakeAsync(() => {
    // given
    storageRepositoryMock.save.and.returnValue(throwError({
      reason: 'some error'
    }))

    // when
    component.storage = {
      name: 'name', buckets: [{name: 'b_name'}]
    }
    component.save();
    tick();

    // then
    expect(matSnackBarMock.open).toHaveBeenCalledTimes(1);

  }))

  it('should trigger check storage on update storage name ', fakeAsync(() => {
    storageServiceMock.isValid.and.returnValue(of({
      valid: true, usedName: false
    }))

    // Given
    const bucketNameInput = fixture.debugElement.query(By.css('#bucket_name')).nativeElement;

    // When
    bucketNameInput.value = "bucket468";

    bucketNameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();

    // Then
    expect(storageServiceMock.isValid).toHaveBeenCalled();
    expect(component.storage.buckets?.length).toEqual(1);
    // @ts-ignore
    expect(component.storage.buckets[0].name).toEqual('bucket468');
  }))


  it('should trigger check storage on update bucket name ', fakeAsync(() => {
    // Given
    storageServiceMock.isValid.and.returnValue(of({
      valid: true, usedName: false
    }))
    const nameInput = fixture.debugElement.query(By.css('#name')).nativeElement;

    // When
    nameInput.value = "storage468";

    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();

    // Then
    expect(storageServiceMock.isValid).toHaveBeenCalled();
    expect(component.storage.buckets?.length).toEqual(1);
    // @ts-ignore
    expect(component.storage.name).toEqual('storage468');
  }))

});
