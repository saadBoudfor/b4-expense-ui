import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import {StorageListComponent} from './storage-list.component';
import {FormsModule} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {StorageRepository} from "../../../../../repositories/storages/storage-repository.service";
import {Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {Storage} from "../../../../../data-model/storages/Storage";
import {of, throwError} from "rxjs";
import {ConfirmationService} from "../../../../../services/common/confirmation.service";
import {ConfigService} from "../../../../../services/common/config.service";
import {By} from "@angular/platform-browser";
import {StorageService} from "../../../../../services/storages/storage.service";

fdescribe('StorageListComponent', () => {
  let component: StorageListComponent;
  let fixture: ComponentFixture<StorageListComponent>;
  const loggerMock: any = jasmine.createSpyObj(['info', 'error', 'debug', 'warn']);
  const routerMock: any = jasmine.createSpyObj(['navigate']);
  const storageRepositoryMock: any = jasmine.createSpyObj(['getAll']);
  const confirmationServiceMock: any = jasmine.createSpyObj(['open']);
  const storageServiceMock: any = jasmine.createSpyObj(['updateSelectedStorageId', 'getSavedStorageId']);
  const fake_list = [
    {id: 1, name: 's_1'},
    {id: 2, name: 's_2'},
    {id: 3, name: 's_3'},
    {id: 4, name: 's_4'},
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StorageListComponent],
      imports: [FormsModule],
      providers: [
        {provide: StorageRepository, useValue: storageRepositoryMock},
        {provide: Router, useValue: routerMock},
        {provide: NGXLogger, useValue: loggerMock},
        {provide: ConfirmationService, useValue: confirmationServiceMock},
        {provide: StorageService, useValue: storageServiceMock},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    storageRepositoryMock.getAll.and.returnValue(of(fake_list));
    fixture = TestBed.createComponent(StorageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when component initialized success', function () {
    it('should load storage list for authenticated user', fakeAsync(() => {
      // Then
      expect(component.storages).toEqual(fake_list);
      expect(storageRepositoryMock.getAll).toHaveBeenCalled();
      expect(loggerMock.info).toHaveBeenCalled();
    }))
    it('should redirect to error page if failed to load storage list', fakeAsync(() => {
      // Given
      loggerMock.error.and.stub();
      storageRepositoryMock.getAll.and.returnValue(throwError({reason: 'some error'}));

      // When
      fixture = TestBed.createComponent(StorageListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      // Then
      expect(loggerMock.error).toHaveBeenCalled();
      expect(confirmationServiceMock.open).toHaveBeenCalled();
    }))
    it('should load selected storage id', fakeAsync(() => {
      // given
      storageServiceMock.getSavedStorageId.and.returnValue(5);
      storageRepositoryMock.getAll.and.returnValue(of(fake_list));

      // when
      component = new StorageListComponent(storageRepositoryMock,
        routerMock,
        storageServiceMock,
        storageServiceMock,
        loggerMock);

      component.ngOnInit();
      tick();

      // Then
      expect(component.selectedStorageId).toEqual(5);
    }))

    it('should put selected storage id to fist storage list id if no id was found in localstorage', fakeAsync(() => {
      // given
      storageServiceMock.getSavedStorageId.and.returnValue(null);
      storageRepositoryMock.getAll.and.returnValue(of(fake_list));

      // when
      component = new StorageListComponent(storageRepositoryMock,
        routerMock,
        storageServiceMock,
        storageServiceMock,
        loggerMock);

      component.ngOnInit();
      tick();

      // Then
      expect(component.selectedStorageId).toEqual(fake_list[0].id);
    }))
  });

  it('should init filtered results with all storage list', fakeAsync(() => {
    // Then
    component.filtered.subscribe(results => {
      expect(results).toEqual(fake_list);
    })
  }))

  it('should filter storage list by name', fakeAsync(() => {
    const bucketNameInput = fixture.debugElement.query(By.css('.search-wrapper input')).nativeElement;
    bucketNameInput.value = 's_1';

    bucketNameInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    component.filtered.subscribe(data => {
      expect(data.length).toEqual(1);
      expect(data[0].name).toEqual('s_1');
    })

  }))

  it('should display storage list after storages list loading', fakeAsync(() => {
    const listItemElements = fixture.debugElement.queryAll(By.css('.storage'));

    for (let i = 0; i < listItemElements.length; i++) {
      const storageHTMLItem = listItemElements[i].nativeElement.innerHTML;
      expect(storageHTMLItem.toString().indexOf(fake_list[i]) !== -1);
    }
  }))

  it('should update selected storage id in localstorage with clicked storage item', fakeAsync(() => {
    storageServiceMock.updateSelectedStorageId.and.callFake((data: any) => {
      localStorage.setItem('savedId', data);
    })
    const storagesHTMLElements = fixture.debugElement.queryAll(By.css('.storage-container'));
    const storageHTMLItem = storagesHTMLElements[0].nativeElement;


    storageHTMLItem.click();
    fixture.detectChanges();

    expect(localStorage.getItem('savedId')).toEqual('1');
  }))

});
