import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public theme = new BehaviorSubject<string>('default');


  public getSelectedTheme(): Observable<string> {
    return this.theme;
  }

  constructor() {
  }

}
