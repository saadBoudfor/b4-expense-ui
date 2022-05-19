import {User} from "../users/User";
import {Bucket} from "./Bucket";

export class Storage {
  id?: number;
  name?: string = '';
  owner?: User;
  buckets?: Bucket[] = [];
}
