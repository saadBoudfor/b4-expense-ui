import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private logger: NGXLogger) {
  }

  /**
   *  Extract data from template url
   * @param name query param name
   * @param params
   *    - redirectionURL: redirection page in error case
   */
  getQueryParam(name: string, params?: { redirectionURL?: string }): number {
    const idStr = this.activatedRoute.snapshot.queryParams[name]
    const id = parseInt(idStr);
    let error = false;

    if (!idStr) {
      this.logger.error('failed to extract ' + name + ' from url');
      error = true;
    }

    if (isNaN(id)) {
      this.logger.error('extracted id ' + name + ' is not valid');
      error = true;
    }

    if (error && params && params.redirectionURL) {
      this.router.navigate([params.redirectionURL]).then(() => {
        this.logger.debug('redirect to ' + params.redirectionURL);
      })
    }

    return id;
  }

  getParamIgnoreChecks(name: string) {
    return this.activatedRoute.snapshot.queryParams[name];
  }

}
