import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../data-model/products/Product";
import {NGXLogger} from "ngx-logger";
import {ProductService} from "../../../../services/products/product.service";
import {NutrientLevels} from "../../../../data-model/products/NutrientLevels";
import {Router} from "@angular/router";

@Component({
  selector: 'save-product',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.scss']
})
export class SaveProductComponent implements OnInit {
  product = new Product();
  isScanningProduct = false;
  private photo: any;
  selectCategory = false;
  category = '';

  constructor(private logger: NGXLogger, private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.logger.info('load save product page');
    this.product.nutrientLevels = new NutrientLevels();
  }

  updateDisplayedCategory() {
    if(this.product.productCategories
      && this.product.productCategories.length !==0) {
        this.category = this.product.productCategories[0].label;
    }
  }

  save() {
    this.productService.save(this.photo, this.product)
      .subscribe(saved => {
        this.logger.info('new product created success', {product: this.product});
        this.router.navigate(['expenses/home'])
      })
  }

  uploadPhoto(photo: any) {
    this.photo = photo;
  }

  onSelectCategory($event: string) {
    this.product.productCategories = [{label: $event}];
    this.updateDisplayedCategory();
    this.selectCategory = false;
  }
}
