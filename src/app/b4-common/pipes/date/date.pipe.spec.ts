import {DatePipe} from './date.pipe';

describe('DatePipe', () => {
  it('create an instance', () => {
    const pipe = new DatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should empty str for undefined params', () => {
    const pipe = new DatePipe();
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform(null)).toBe('');
  })

  it('should empty str for invalid dates', () => {
    const pipe = new DatePipe();
    expect(pipe.transform('20ok')).toBe('');
  })

  it('should add 0 to day and month if composed with one number', () => {
    const pipe = new DatePipe();

    const formattedDate = pipe.transform('2022-01-01')

    expect(formattedDate).toBe('01/01/2022');
  })

  it('should format date success', () => {
    const pipe = new DatePipe();

    const formattedDate = pipe.transform('2022-12-01')

    expect(formattedDate).toBe('01/12/2022');
  })
});
