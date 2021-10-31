import {User} from "../../b4-common/models/User";
import {Place} from "../../b4-common/models/Place";
import {ExpenseLine} from "./ExpenseLine";

export class Expense {
  id?: number;
  name?: string = '';
  expenseLines: ExpenseLine[] = [];
  date?: string = (new Date().toISOString()).split('T')[0];
  comment?: string;
  author?: User;
  user?: User;
  place!: Place;
  bill?: any; // used to store expense bill (localy)
}
