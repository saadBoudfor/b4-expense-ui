import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {NewBucketComponent} from './new-bucket.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {BucketRepository} from "../../../repositories/bucket-repository.service";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

fdescribe('NewBucketComponent', () => {
  let component: NewBucketComponent;
  let fixture: ComponentFixture<NewBucketComponent>;
  const activatedRouteMock: any = jasmine.createSpyObj([], ['activatedRoute'])
  const loggerMock: any = jasmine.createSpyObj(['info', 'warn', 'error']);
  const routerMock: any = jasmine.createSpyObj(['navigate']);
  const bucketRepositoryMock: any = jasmine.createSpyObj(['checkIfUsed', 'save']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: NGXLogger, useValue: loggerMock},
        {provide: Router, useValue: routerMock},
        {provide: BucketRepository, useValue: bucketRepositoryMock},
      ],
      imports: [FormsModule],
      declarations: [NewBucketComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    routerMock.navigate.and.returnValue(Promise.resolve({redirect: true}))
    activatedRouteMock.snapshot = {queryParams: {storageId: '5'}};
    fixture = TestBed.createComponent(NewBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('On init component', () => {

    it('should get storage id from url', fakeAsync(() => {
      expect(component.storageId).toEqual(5);
    }))
    it('should redirect to storage home page if storage id is invalid', fakeAsync(() => {
      activatedRouteMock.snapshot = {queryParams: {storageId: '-5'}};
      component.ngOnInit();

      expect(routerMock.navigate).toHaveBeenCalled();
      expect(loggerMock.error).toHaveBeenCalled();
    }))
  })

  describe('new bucket input', () => {
    it('should display error message if new bucket name is already used', fakeAsync(() => {
      // Given
      bucketRepositoryMock.checkIfUsed.and.returnValue(of({
        existByName: true
      }))

      // When
      const bucketNameInput = fixture.debugElement.query(By.css('input')).nativeElement;
      bucketNameInput.value = 'one5';

      bucketNameInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();

      // Then
      const container = fixture.debugElement.query(By.css('main')).nativeElement;
      const submitButton = fixture.debugElement.query(By.css('main button.submit')).nativeElement;

      const isContainsErrorMessage = container.innerHTML.indexOf('Ce nom est déjà utilisé') !== -1;
      expect(isContainsErrorMessage).toBeTrue();
      expect(submitButton.disabled).toBeTrue();
    }))

    it('should allow user to submit bucket if buckets name is valid', fakeAsync(() => {
      // Given
      bucketRepositoryMock.checkIfUsed.and.returnValue(of({
        existByName: false
      }))

      // When
      const bucketNameInput = fixture.debugElement.query(By.css('input')).nativeElement;
      bucketNameInput.value = 'one5';

      bucketNameInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();

      // Then
      const container = fixture.debugElement.query(By.css('main')).nativeElement;
      const submitButton = fixture.debugElement.query(By.css('main button.submit')).nativeElement;

      const isContainsErrorMessage = container.innerHTML.indexOf('Ce nom est déjà utilisé') !== -1;
      expect(isContainsErrorMessage).toBeFalse();
      expect(submitButton.disabled).toBeFalse()
    }))

    it('should disable submit button if bucket name\'s length < 3', fakeAsync(() => {
      // When
      const bucketNameInput = fixture.debugElement.query(By.css('input')).nativeElement;
      bucketNameInput.value = 'on';

      bucketNameInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();

      // Then
      const submitButton = fixture.debugElement.query(By.css('main button.submit')).nativeElement;
      expect(submitButton.disabled).toBeTrue();
    }))
  })

  describe('Submit bucket', () => {
    it('should submit bucket success', fakeAsync(() => {
      bucketRepositoryMock.save.and.returnValue(of({
        id: 5,
        name: 'bucket_name',
        owner: {id: 1},
        storage: {id: 1}
      }))

      component.bucket = {
        name: 'bucket_name'
      }

      const submitButton = fixture.debugElement.query(By.css('main button.submit')).nativeElement;

      fixture.detectChanges(); // update input value (using ngModel)
      submitButton.click();
      tick();

      expect(component.bucket.storage).toEqual({id: 5})
      expect(bucketRepositoryMock.save).toHaveBeenCalled();
    }))

    it('should redirect to storage home page after submit bucket success', fakeAsync(() => {
      bucketRepositoryMock.save.and.returnValue(of({
        id: 5,
        name: 'bucket_name',
        owner: {id: 1},
        storage: {id: 1}
      }))

      component.bucket = {
        name: 'bucket_name'
      }

      const submitButton = fixture.debugElement.query(By.css('main button.submit')).nativeElement;

      fixture.detectChanges(); // update input value (using ngModel)
      submitButton.click();
      tick();

      expect(component.bucket.storage).toEqual({id: 5})
      expect(bucketRepositoryMock.save).toHaveBeenCalled();
      expect(routerMock.navigate).toHaveBeenCalled();
    }))
  })

});
