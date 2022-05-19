import {Address} from "./Address";

export class Place {
  id!: number;
  name!: string;
  address!: Address;
  type!: 'RESTAURANT' | 'STORE'
}
