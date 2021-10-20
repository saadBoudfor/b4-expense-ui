import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  private $data = new BehaviorSubject<ConfirmationPageModel>({message: '', steps: 0, page: '', active: 0, success: true});

  constructor() {
  }

  public setData(confirmationPageModel: ConfirmationPageModel): void {
    this.$data.next(confirmationPageModel);
  }

  public getData(): Observable<ConfirmationPageModel> {
    return this.$data.asObservable();
  }
}

export interface ConfirmationPageModel {
  message: string;
  steps: number;
  active: number;
  page: string;
  success: boolean;
}
