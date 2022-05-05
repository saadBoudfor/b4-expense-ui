import {Pipe, PipeTransform} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Product} from "../../models/Product";

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
