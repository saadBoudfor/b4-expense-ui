import {Expense} from "../../b4-expenses/models/expenses/Expense";
import {Product} from "../../b4-expenses/models/expenses/Product";
import {Bucket} from "./Bucket";
import {User} from "../../b4-common/models/User";
import {UpdateQuantity} from "./UpdateQuantity";

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
