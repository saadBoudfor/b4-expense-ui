import {PeriodPipe} from './period.pipe';

fdescribe('PeriodPipe', () => {

  let periodPipe: PeriodPipe;

  beforeEach(() => {
    periodPipe = new PeriodPipe();
  })

  it('create an instance', () => {
    expect(periodPipe).toBeTruthy();
  });

  it('should return empty str for empty given period', () => {
    expect(periodPipe.transform()).toEqual('');
    expect(periodPipe.transform(null)).toEqual('');
    expect(periodPipe.transform(undefined)).toEqual('');
  })

  it('should render days', () => {
    expect(periodPipe.transform({days: 3})).toEqual('3 jours ');
  })

  it('should render hours', () => {
    expect(periodPipe.transform({hours: 3})).toEqual('3 heures ');
  })

  it('should render minutes', () => {
    expect(periodPipe.transform({minutes: 3})).toEqual('3 minutes');
  })

  it('should render all', () => {
    expect(periodPipe.transform({days: 6, hours: 8, minutes: 3})).toEqual('6 jours 8 heures 3 minutes');
  })
});
