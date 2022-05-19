import {ExpensePricePipe} from './expense-price.pipe';

fdescribe('ExpensePricePipe', () => {
  const pipe = new ExpensePricePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty value', () => {
    expect(pipe.transform(undefined)).toEqual('');
    expect(pipe.transform(null)).toEqual('');
  })

  it('should compute expense total price success', () => {
    expect(pipe.transform({
      expenseLines: [
        {price: 1},
        {price: 1},
        {price: 1},
        {price: 1}
      ]
    } as any)).toEqual('4 €');
  })

  it('should compute expense total price success when some expense line price are null', () => {
    expect(pipe.transform({
      expenseLines: [
        {price: 1},
        {price: 1},
        {price: 1},
        {price: undefined}
      ]
    } as any)).toEqual('3 €');
  })
});
