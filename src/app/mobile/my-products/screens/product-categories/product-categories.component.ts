import {Component, OnInit, Output} from '@angular/core';
import {CategoriesRepository} from "../../../../repositories/categories/categories-repository.service";
import {Category} from "../../../../data-model/products/Category";
import {NGXLogger} from "ngx-logger";
import {EventEmitter} from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {
  categories!: Category[];

  @Output()
  close = new EventEmitter();
  loading = false;
  baseURL = environment.baseUrl + '/products/categories/';

  @Output()
  selected = new EventEmitter<string>();

  constructor(private repository: CategoriesRepository, private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.logger.debug('load display categories component');
    this.repository.getAll().subscribe(categories => {
      this.categories = categories;
      this.loading = false;
    })
  }


}
