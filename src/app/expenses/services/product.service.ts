import {Injectable} from '@angular/core';
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {
  }

  public isValid(product: Product): boolean {
    return isNotEmpty(product.name)
      && isNotEmpty(product.category)
      && product.quantity>0;
  }
}

function isNotEmpty(name: String) {
  return !!name && name.length !== 0;
}
