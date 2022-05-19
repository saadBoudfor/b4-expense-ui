import {Item} from "./Item";
import {Storage} from "./Storage";
import {User} from "../users/User";

export class Bucket {
  id?: number;
  name?: string = '';
  storage?: Storage;
  items?: Item[];
  owner?: User;
}
