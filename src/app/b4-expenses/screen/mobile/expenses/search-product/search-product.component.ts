import {Component, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ProductService} from "../../../../services/product.service";
import {Product} from "../../../../models/Product";
import {EventEmitter} from '@angular/core';
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  searchedProduct: string = '';
  productList: Product[] | undefined;
  iconPath = '/assets/products/';

  constructor(private translateService: TranslateService,
              private productService: ProductService) {
  }

  @Output()
  selected = new EventEmitter();
  photoBaseURl: string = environment.fileServerURL + '/products/';

  ngOnInit(): void {
    this.searchProduct();
  }

  searchProduct() {
    this.productService.requestSearchProduct(this.searchedProduct).subscribe(
      found => this.productList = found
    )
  }

  getIcon(product: Product) {
    switch (product.category) {
      default:
      case 'VEGETABLE':
        return this.iconPath + 'vegetable.svg';
      case 'MEAT':
        return this.iconPath + 'meat.svg';
      case 'DRINK':
        return this.iconPath + 'drink.svg';
    }
  }

  selectProduct(product: Product) {
    this.selected.emit(product);
  }
}
