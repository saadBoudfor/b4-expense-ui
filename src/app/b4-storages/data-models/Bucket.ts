import {Item} from "./Item";
import {Storage} from "./Storage";
import {User} from "../../b4-common/models/User";

export class Bucket {
  id?: number;
  name?: string = '';
  storage?: Storage;
  items?: Item[];
  owner?: User;
}
