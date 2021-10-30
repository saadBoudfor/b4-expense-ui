/**
 * Model for Product object
 */
export class Product {
  id?: number = 0;
  quantity: number = 0;
  displayQuantity: string = '';
  brand: string = '';
  name: string = '';
  qrCode: string = '';
  comment: string = '';
  calories?: number;
  category: string = '';
  photo?: string;
}
