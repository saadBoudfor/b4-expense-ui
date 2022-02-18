import {User} from "../../b4-common/models/User";
import {Bucket} from "./Bucket";

export class Storage {
  id?: number;
  name?: string = '';
  owner?: User;
  buckets?: Bucket[] = [];
}
