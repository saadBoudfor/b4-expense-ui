import {Pipe, PipeTransform} from '@angular/core';
import {Product} from "../models/expenses/Product";
import {environment} from "../../../environments/environment";

@Pipe({
  name: 'productPhoto'
})
export class ProductPhotoPipe implements PipeTransform {

  transform(product: Product): unknown {
    if (!product.photo) return '';
    if (product.photo && product.photo.indexOf('https') === -1) return productPhotoServerUrl + product.photo;
    return product.photo;
  }

}

const productPhotoServerUrl = environment.fileServerURL + '/products/';
