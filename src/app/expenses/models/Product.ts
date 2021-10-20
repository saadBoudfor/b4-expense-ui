/**
 * Model for Product object
 */
export class Product {
  id?: number;
  quantity: number = 0;
  name: string = '';
  qrCode: string = '';
  comment: string = '';
  calories?: number;
  category: string = '';
}
