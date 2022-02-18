import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public theme = new BehaviorSubject<string>('default');

  constructor() {
  }

}
