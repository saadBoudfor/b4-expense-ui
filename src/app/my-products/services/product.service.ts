import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public isValid(product: Product): boolean {
    return isNotEmpty(product.name)
      && isNotEmpty(product.category)
      && product.quantity > 0;
  }

  save(file: any, product: Product) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('product', JSON.stringify(product));

    return this.httpClient.post<Product>(environment.baseUrl + '/products', formData);
  }

  requestSearchProduct(name: string | null): Observable<Product[]> {
    if (!name) name = 'all';
    return this.httpClient.get<Product[]>(environment.baseUrl + '/products/' + name);
  }

  getByCode(code: string): Observable<Product> {
    return this.httpClient.get<Product>(environment.baseUrl + '/products/code/' + code);
  }

  getLast(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.baseUrl + '/products/last');
  }
}

function isNotEmpty(name: String) {
  return !!name && name.length !== 0;
}
