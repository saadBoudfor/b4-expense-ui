
import {Bucket} from "./Bucket";
import {User} from "../users/User";
import {UpdateQuantity} from "./UpdateQuantity";
import {Expense} from "../expenses/Expense";
import {Product} from "../products/Product";

export class Item {
  id?: number;
  expense?: Expense;
  product?: Product;
  quantity: number = 1;
  remaining?: number;
  expirationDate?: string | undefined;
  openDate?: string | null;
  addDate?: string | null;
  expirationAfter?: { days?: number, hours?: number, minutes?: number };
  state?: 'open' | 'closed';
  location?: Bucket;
  author?: User;
  quantityHistory?: UpdateQuantity[];
}
