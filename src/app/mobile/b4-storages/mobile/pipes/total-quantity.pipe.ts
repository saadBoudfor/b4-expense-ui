import {Pipe, PipeTransform} from '@angular/core';
import {Item} from "../../../../data-model/storages/Item";

@Pipe({
  name: 'totalQuantity'
})
export class TotalQuantityPipe implements PipeTransform {

  transform(item: Item): unknown {

    if (!item || (!!item && !item.product)) {
      return '';
    }
    if (item.quantity && item.product && item.product.productQuantity) {
      return (item.quantity * item.product.productQuantity) + ' ' + item?.product?.unit;
    }
    return item.product?.displayQuantity;
  }

}
