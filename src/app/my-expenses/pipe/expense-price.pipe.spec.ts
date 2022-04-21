import { ExpensePricePipe } from './expense-price.pipe';

describe('ExpensePricePipe', () => {
  it('create an instance', () => {
    const pipe = new ExpensePricePipe();
    expect(pipe).toBeTruthy();
  });
});
