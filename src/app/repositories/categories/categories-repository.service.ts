import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NGXLogger} from "ngx-logger";
import {Observable} from "rxjs";
import {Category} from "../../data-model/products/Category";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriesRepository {

  constructor(private httpClient: HttpClient, private logger: NGXLogger) {
  }

  getAll(): Observable<Category[]> {
    this.logger.debug('load all product categories');
    return this.httpClient.get<Category[]>(environment.baseUrl + '/products/categories');
  }
}
