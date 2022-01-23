import {ConfirmationService} from './confirmation.service';

describe('ConfirmationService', () => {
  let service: ConfirmationService;
  let routerMock = jasmine.createSpyObj(['navigate']);


  it('should confirmation be in initial state on create', () => {
    // Given
    service = new ConfirmationService(routerMock);

    // When
    const confirmationObservable = service.getData();

    // Then
    confirmationObservable.subscribe(data => {
      expect(data).toEqual({
        message: '',
        steps: 0,
        page: '',
        active: 0,
        success: true,
        title: ''
      })
    })
  });

  it('should update data success', () => {
    // Given
    routerMock.navigate.and.callFake(() => new Promise(() => true))
    service = new ConfirmationService(routerMock);

    // When
    const newMessage = {
      message: 'testing message ...',
      steps: 1,
      page: '0',
      active: 6,
      success: false,
      title: 'my test'
    };

    service.displayConfirmationMessage(newMessage);

    // Then
    expect(routerMock.navigate).toHaveBeenCalledTimes(1);
    service.getData().subscribe(current =>   expect(current).toEqual(newMessage));
  })
});
