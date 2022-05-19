import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public theme = new BehaviorSubject<string>('default');
  private isNavBarEnabled = new BehaviorSubject<boolean>(false);

  public getSelectedTheme(): Observable<string> {
    return this.theme;
  }

  public enableNavBar(): Observable<boolean> {
    return this.isNavBarEnabled.asObservable();
  }

  public showNavBar() {
    return this.isNavBarEnabled.next(true);
  }

  public hideNavBar() {
    return this.isNavBarEnabled.next(false);
  }

  constructor() {
  }

}
