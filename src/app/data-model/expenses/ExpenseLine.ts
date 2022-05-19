import {Product} from "../products/Product";

export class ExpenseLine {
  id?: string;
  product?: Product;
  price?: number ;
  quantity?: number  = 1;
  comment?: string;
}
