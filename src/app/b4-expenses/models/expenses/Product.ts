/**
 * Model for Product object
 */
import {NutrientLevels} from "./NutrientLevels";

export class Product {
  // required fields
  quantity: number = 0; // deprecated
  productQuantity: number = 0;
  unit: string = 'g';
  displayQuantity: string = '';
  brand: string = '';
  name: string = '';
  qrCode: string = '';
  comment: string = '';

  // optional fields
  id?: number = 0;
  calories?: number;
  category: string = '';
  photo?: string;
  dataPer?: string;
  score?: string;
  nutrientLevels?: NutrientLevels;

  constructor(id?: number) {
    this.id = id;
  }

}
