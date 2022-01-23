/**
 * Model for Product object
 */
import {NutrientLevels} from "./NutrientLevels";

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
  dataPer?: string;
  score?: string;
  nutrientLevels?: NutrientLevels;
}
