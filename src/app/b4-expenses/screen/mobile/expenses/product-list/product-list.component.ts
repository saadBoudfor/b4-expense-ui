import {Component, Input, OnInit, Output} from '@angular/core';
import {ProductService} from "../../../../services/product.service";
import {Product} from "../../../../models/Product";
import {environment} from "../../../../../../environments/environment";
import {EventEmitter} from '@angular/core';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input()
  returnSelectedProduct = false;

  photoBaseURL = environment.fileServerURL + '/products/'

  selectProduct: Product | null = null;

  products!: Product[];
  filter: 'all' | 'b4-expenses' = 'all';
  allProducts!: Product[];
  lastUsedProducts!: Product[];
  searchedTerm: string = '';

  // event return selected product
  @Output()
  selected = new EventEmitter<Product>();

  @Output()
  close = new EventEmitter<string>();

  @Input()
  enableClose = false;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getLast().subscribe(products => {
      this.lastUsedProducts = products;
    })

    this.productService.requestSearchProduct(null).subscribe(allProducts => {
      this.allProducts = allProducts;
      this.applyFilter('all');
    })

  }


  applyFilter(filter: 'all' | 'b4-expenses') {
    console.log('select: ', filter);
    this.filter = filter;
    switch (filter) {
      case "all":
        this.products = this.allProducts;
        break;
      case "b4-expenses":
        this.products = this.lastUsedProducts;
    }
  }

  onSearch($event: KeyboardEvent) {
    if (this.filter === 'all') {
      this.productService.requestSearchProduct(this.searchedTerm).subscribe(data => {
        this.allProducts = data;
        this.applyFilter('all');
      })
    }
  }
}
