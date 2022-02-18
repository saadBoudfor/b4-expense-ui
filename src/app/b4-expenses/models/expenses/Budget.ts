import {User} from "../../../b4-common/models/User";

export class Budget {
  id?: number;
  date?: string;
  target?: number;
  user?: User;
}
