import {fakeAsync} from '@angular/core/testing';

import {NavigationService} from './navigation.service';

fdescribe('NavigationService', () => {
  let service: NavigationService;
  let loggerMock = jasmine.createSpyObj(['error', 'debug']);
  let routerMock = jasmine.createSpyObj(['navigate']);

  beforeEach(() => {
    routerMock.navigate.and.returnValue(Promise.resolve({redirect: true}))
    loggerMock.error.and.callFake((data: any) => console.error(data));
  })

  it('should extract id success', () => {
    // Given
    const activatedRoute: any = {
      snapshot: {queryParams: {'id': '6'}}
    }

    // When
    service = new NavigationService(activatedRoute, routerMock, loggerMock);

    // Then
    expect(service.getQueryParam('id')).toEqual(6);
  });

  it('should log error if failed extracting id', fakeAsync(() => {
    // Given
    const activatedRoute: any = {
      snapshot: {queryParams: {'id': '6'}}
    }

    // When
    service = new NavigationService(activatedRoute, routerMock, loggerMock);

    // Then
    service.getQueryParam('invalid_name_id');
    expect(loggerMock.error).toHaveBeenCalled();
  }))

  it('should log error if extracted id is invalid', fakeAsync(() => {
    // Given
    const activatedRoute: any = {
      snapshot: {queryParams: {'id': 'invalid'}}
    }

    // When
    service = new NavigationService(activatedRoute, routerMock, loggerMock);

    // Then
    service.getQueryParam('id', {redirectionURL: '/page'});
    expect(loggerMock.error).toHaveBeenCalled();
  }))

  it('should redirect if failed extracting id', fakeAsync(() => {
    // Given
    const activatedRoute: any = {
      snapshot: {queryParams: {'id': '6'}}
    }

    // When
    service = new NavigationService(activatedRoute, routerMock, loggerMock);

    // Then
    service.getQueryParam('invalid_name_id');
    expect(loggerMock.error).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalled();
  }))

  it('should redirect if extracted id is invalid', fakeAsync(() => {
    // Given
    const activatedRoute: any = {
      snapshot: {queryParams: {'id': 'invalid'}}
    }

    // When
    service = new NavigationService(activatedRoute, routerMock, loggerMock);

    // Then
    service.getQueryParam('id', {redirectionURL: '/page'});
    expect(loggerMock.error).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalled();
  }))

});
