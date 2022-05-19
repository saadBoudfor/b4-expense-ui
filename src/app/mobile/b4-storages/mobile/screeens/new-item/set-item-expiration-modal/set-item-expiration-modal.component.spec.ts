import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {SetItemExpirationModalComponent} from './set-item-expiration-modal.component';
import {ConfigService} from "../../../../../../services/common/config.service";
import {OverlayContainer} from "@angular/cdk/overlay";
import {of} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NO_ERRORS_SCHEMA} from "@angular/core";

fdescribe('SetItemExpirationModalComponent', () => {
  let component: SetItemExpirationModalComponent;
  let fixture: ComponentFixture<SetItemExpirationModalComponent>;
  let overlayContainerMock = jasmine.createSpyObj(['getContainerElement']);
  let configServiceMock = jasmine.createSpyObj(['getSelectedTheme']);
  let dialogRefMock = jasmine.createSpyObj(['close']);

  describe('initialised with non existing data', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [SetItemExpirationModalComponent],
        providers: [
          {provide: ConfigService, useValue: configServiceMock},
          {provide: MatDialogRef, useValue: dialogRefMock},
          {provide: OverlayContainer, useValue: overlayContainerMock},
          {provide: MAT_DIALOG_DATA, useValue: null}
        ],
        schemas: [NO_ERRORS_SCHEMA]
      })
        .compileComponents();
    });

    beforeEach(() => {
      configServiceMock.getSelectedTheme.and.returnValue(of('dark'));
      fixture = TestBed.createComponent(SetItemExpirationModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.expirationDuration).toEqual({})
      expect(configServiceMock.getSelectedTheme).toHaveBeenCalled();
      expect(overlayContainerMock.getContainerElement).toHaveBeenCalled();
    });
  })


  describe('initialised with existing data', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [SetItemExpirationModalComponent],
        providers: [
          {provide: ConfigService, useValue: configServiceMock},
          {provide: MatDialogRef, useValue: dialogRefMock},
          {provide: OverlayContainer, useValue: overlayContainerMock},
          {provide: MAT_DIALOG_DATA, useValue: {days: 5}}
        ],
        schemas: [NO_ERRORS_SCHEMA]
      })
        .compileComponents();
    });

    beforeEach(() => {
      configServiceMock.getSelectedTheme.and.returnValue(of('dark'));
      fixture = TestBed.createComponent(SetItemExpirationModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component.expirationDuration).toEqual({days: 5})
      expect(component).toBeTruthy();
      expect(configServiceMock.getSelectedTheme).toHaveBeenCalled();
      expect(overlayContainerMock.getContainerElement).toHaveBeenCalled();
    });
  })
});
