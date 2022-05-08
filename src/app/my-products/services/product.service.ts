import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Product} from "../models/Product";
import {NGXLogger} from "ngx-logger";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private logger: NGXLogger) {
  }

  public static isValid(product: Product): boolean {
    return !!product && isNotEmpty(product.name)
      && isNotEmpty(product.productCategories)
      && isNotEmpty(product.unit)
      && product.productQuantity > 0;
  }

  save(file: any, product: Product) {
    if (!ProductService.isValid(product)) {
      this.logger.error('cannot save invalid product', {product})
      throw Error('cannot save invalid product');
    }

    if (!file) {
      const message = 'required product photo is missing'
      this.logger.error(message, {product})
      throw Error(message);
    }

    this.logger.debug('save new product', {product});
    const formData = new FormData();
    formData.append('file', file);
    formData.append('product', JSON.stringify(product));

    return this.httpClient.post<Product>(url + '', formData);
  }

  getByName(name?: string): Observable<Product[]> {
    this.logger.debug('search product with name ' + name);
    if (!name) name = 'all';
    return this.httpClient.get<Product[]>(url + '/' + name);
  }

  getByCode(code: string): Observable<Product> {
    this.logger.debug('search product with barcode' + code);
    return this.httpClient.get<Product>(url + '/code/' + code);
  }

  getLast(): Observable<Product[]> {
    this.logger.debug('get last used products ');
    return this.httpClient.get<Product[]>(url + '/last');
  }
}

const url = environment.baseUrl + '/products';

function isNotEmpty(name: string | any[] | undefined | null) {
  return !!name && name.length !== 0;
}

