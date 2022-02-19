import {TotalQuantityPipe} from './total-quantity.pipe';

fdescribe('TotalQuantityPipe', () => {

  let pipe: TotalQuantityPipe;

  beforeEach(() => {
    pipe = new TotalQuantityPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for item empty ', () => {
    const item: any = undefined;
    expect(pipe.transform(item)).toEqual('');
  })

  it('should return empty string if item\'s product not defined ', () => {
    const item: any = {product: undefined};
    expect(pipe.transform(item)).toEqual('');
  })

  it('should return product display quantity if item\'s quantity not defined', () => {
    const item: any = {product: {displayQuantity: '65 g'}};
    expect(pipe.transform(item)).toEqual('65 g');
  })

  it('should compute total quantity success', () => {
    const item: any = {quantity: 5, product: {productQuantity: 20, unit: 'g'}};
    expect(pipe.transform(item)).toEqual('100 g');
  })
});
