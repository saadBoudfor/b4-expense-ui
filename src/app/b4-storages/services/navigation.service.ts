import {Injectable} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private activatedRoute: ActivatedRoute) {
  }

  /**
   *  Extract data from template url
   * @param name query param name
   * @param params
   *    - redirectionURL: redirection page in error case
   */
  getQueryParam(name: string, params?: { redirectionURL?: string }): number {
    const idStr = this.activatedRoute.snapshot.queryParams[name];
    return parseInt(idStr);
  }
}
