import {ProductService} from './product.service';
import {fakeAsync} from "@angular/core/testing";
import {of} from "rxjs";
import {endsWith} from "lodash";

fdescribe('ProductService', () => {
  let service: ProductService;
  let loggerMock = jasmine.createSpyObj(['debug', 'error']);
  let httpClientMock = jasmine.createSpyObj(['get', 'post']);

  beforeEach(() => {
    loggerMock.debug.calls.reset();
    httpClientMock.get.calls.reset();
    httpClientMock.post.calls.reset();

    httpClientMock.post.and.returnValue(of(validProduct));
    httpClientMock.get.and.returnValue(of(validProduct));

    loggerMock.error.and.callFake((data: any) => console.log(data));
    loggerMock.debug.and.callFake((data: any) => console.log(data));

    service = new ProductService(httpClientMock, loggerMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should check product validity success', () => {
    const nullProduct = null as any;

    expect(ProductService.isValid(validProduct)).toBeTruthy();
    expect(ProductService.isValid(nullProduct)).toBeFalsy();
    expect(ProductService.isValid({
      productCategories: [{label: 'label', imgURL: 'label.jpg'}],
      productQuantity: 569.6,
      displayQuantity: '569.6g',
      unit: 'g',
    } as any)).toBeFalsy();

    expect(ProductService.isValid({
      name: 'product_name',
      productQuantity: 569.6,
      displayQuantity: '569.6g',
      unit: 'g',
    })).toBeFalsy();

    expect(ProductService.isValid({
      name: 'product_name',
      productCategories: [{label: 'label', imgURL: 'label.jpg'}],
      displayQuantity: '569.6g',
      unit: 'g',
    } as any)).toBeFalsy();

    expect(ProductService.isValid({
      name: 'product_name',
      productCategories: [{label: 'label', imgURL: 'label.jpg'}],
      productQuantity: 569.6,
      displayQuantity: '569.6g',
    } as any)).toBeFalsy();
  })

  it('should save new product success', fakeAsync(() => {

    service.save('file', validProduct);

    expect(httpClientMock.post).toHaveBeenCalledTimes(1);
  }))

  it('should throw error if save product without image', () => {
    expect(() => service.save(null, validProduct)).toThrow(new Error('required product photo is missing'));
  })

  it('should throw error if save invalid product', () => {
    const invalidProduct = {
      name: 'product_name',
      productCategories: [{label: 'label', imgURL: 'label.jpg'}],
      productQuantity: 569.6,
      displayQuantity: '569.6g',
    } as any;

    expect(() => service.save('file', invalidProduct)).toThrow(new Error('cannot save invalid product'));
  })

  it('should search product success',() => {
    service.getByName('product_name');
    expect(httpClientMock.get.calls.mostRecent().args[0]).toContain('/product_name')
  })

  it('should search all product if no args provided success',() => {
    service.getByName();
    expect(httpClientMock.get.calls.mostRecent().args[0]).toContain('/all');
  })


  it('should search product success',() => {
    service.getByCode('0000');
    expect(httpClientMock.get.calls.mostRecent().args[0]).toContain('/code/0000');
  })

  it('should search product success',() => {
    service.getLast();
    expect(httpClientMock.get.calls.mostRecent().args[0]).toContain('/last');
  })

});


const validProduct = {
  name: 'product_name',
  productCategories: [{label: 'label', imgURL: 'label.jpg'}],
  productQuantity: 569.6,
  displayQuantity: '569.6g',
  unit: 'g',
}
