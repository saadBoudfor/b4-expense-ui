import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {EventEmitter} from '@angular/core';
import {Subscription} from "rxjs";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/Product";

@Component({
  selector: 'search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit, OnDestroy {
  searchedProduct: string = '';
  productList: Product[] | undefined;
  iconPath = '/assets/products/';

  $searchProductRequest!: Subscription;

  searching = false;

  constructor(private translateService: TranslateService,
              private productService: ProductService) {
  }

  @Output()
  selected = new EventEmitter();

  @Output()
  close = new EventEmitter<true>();

  ngOnInit(): void {
    this.searchProduct();
  }

  searchProduct() {
    this.searching = true;
    if (!!this.$searchProductRequest) {
      this.$searchProductRequest.unsubscribe();
    }
    this.$searchProductRequest = this.productService
      .getByName(this.searchedProduct)
      .subscribe(found => {
          this.productList = found;
          this.searching = false;
        }
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

  ngOnDestroy(): void {
    if (!!this.$searchProductRequest) {
      this.$searchProductRequest.unsubscribe();
    }

  }
}
