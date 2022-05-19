/**
 * Model for Product object
 */
import {NutrientLevels} from "./NutrientLevels";
import {Category} from "./Category";

export class Product {
  //  fields
  quantity?: number = 0; // deprecated
  productQuantity: number = 0;
  unit: string = 'g';
  displayQuantity: string = '';
  brand?: string = '';
  name: string = '';
  qrCode?: string = '';
  comment?: string = '';

  // optional fields
  id?: number = 0;
  calories?: number;
  // category?: string = '';
  photo?: string;
  dataPer?: string;
  score?: string;
  nutrientLevels?: NutrientLevels;
  productCategories: Category[] = [];

  constructor(id?: number) {
    this.id = id;
  }

}
