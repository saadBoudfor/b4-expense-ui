import {HomeComponent} from './home.component';
import {of} from "rxjs";

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  const loggerMock = jasmine.createSpyObj(['info']);
  const repositoryMock = jasmine.createSpyObj(['getBasicStats']);

  it('should get data success', () => {
    // Given
    repositoryMock.getBasicStats.and.returnValue(of({
      target: 50,
      total: 1,
      count: 90,
      countForCurrentWeek: 10,
      totalForCurrentWeek: 1
    }))
    component = new HomeComponent(repositoryMock, loggerMock);

    // When
    component.ngOnInit();

    // then
    expect(repositoryMock.getBasicStats).toHaveBeenCalledTimes(1);

  })
});
