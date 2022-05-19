import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NGXLogger} from "ngx-logger";
import {Product} from "../../../../data-model/products/Product";
import {ProductService} from "../../../../services/products/product.service";

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Output()
  close = new EventEmitter();

  private _product!: Product;


  itemInformation: { key: string, value?: string, action?: 'update_category' }[] = [];
  nutritionalInformation: { key: string, value?: string }[] = [];
  product_photo!: string | undefined;
  displayCategories = false;

  @Input()
  set product(product: Product) {
    this._product = product;
    this.displayInformation(this._product);
  }

  displayInformation(product: Product) {
    this.logger.debug('show product ' + product.name + ' details', {product})
    this.itemInformation = [
      {key: 'Nom du produit', value: product?.name},
      {key: 'Quantité', value: product?.displayQuantity},
      {key: 'Expiration apres ouverture', value: '3 j'},
      {key: 'Categorie', value: product?.productCategories[0]?.label, action: 'update_category'}
    ]

    this.nutritionalInformation = [
      {key: 'Calories', value: product?.calories + ' kcal'},
      {key: 'Nutri-score', value: product?.score?.toUpperCase()},
      {key: 'Matière grasses', value: product?.nutrientLevels?.fat},
      {key: 'Glucides', value: product?.nutrientLevels?.saturatedFat},
      {key: 'Sucres', value: product?.nutrientLevels?.sugars},
      {key: 'Sel', value: product?.nutrientLevels?.salt},
    ]
    this.product_photo = product?.photo;
  }

  constructor(private logger: NGXLogger, private productService: ProductService) {
  }


  ngOnInit(): void {
  }

  onClose() {
    this.logger.debug('close product details page');
    this.close.emit();
  }

  onSelectCategory(label: string) {
    const categories = this._product.productCategories;
    if (!!categories && categories.length !== 0) {
      this._product.productCategories = [];
    }
    categories?.push({label});
    this.displayCategories = false
    this.displayInformation(this._product);
    this.productService.update(this._product).subscribe(saved => {
      this.logger.info('product category updated', {saved});
    })
  }
}
