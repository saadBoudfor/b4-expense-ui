import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {EventEmitter} from '@angular/core';
import {Subscription} from "rxjs";
import {ProductService} from "../../../../services/products/product.service";
import {Product} from "../../../../data-model/products/Product";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit, OnDestroy {
  searchedProduct: string = '';
  productList: Product[] | undefined;

  $searchSubscription!: Subscription;

  searching = false;

  constructor(private translateService: TranslateService,
              private logger: NGXLogger,
              private productService: ProductService) {
  }

  @Output()
  selected = new EventEmitter();

  @Output()
  close = new EventEmitter<true>();

  ngOnInit(): void {
    this.logger.info('load search product page');
    this.searchProduct();
  }

  searchProduct() {
    this.searching = true;
    if (!!this.$searchSubscription) {
      this.$searchSubscription.unsubscribe();
    }
    this.$searchSubscription = this.productService
      .getByName(this.searchedProduct)
      .subscribe(found => {
          this.productList = found;
          this.searching = false;
        }
      )
  }

  selectProduct(product: Product) {
    this.logger.debug('select product', {product});
    this.selected.emit(product);
  }

  ngOnDestroy(): void {
    if (!!this.$searchSubscription) {
      this.$searchSubscription.unsubscribe();
    }
  }
}
