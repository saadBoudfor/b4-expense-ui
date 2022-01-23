import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  private $data = new BehaviorSubject<ConfirmationPageModel>(EMPTY_MESSAGE);

  constructor(private routerService: Router) {
  }

  public displayConfirmationMessage(confirmationPageModel: ConfirmationPageModel): void {
    this.$data.next(confirmationPageModel);
    this.routerService.navigate(['/confirmation'])
  }

  public getData(): Observable<ConfirmationPageModel> {
    return this.$data.asObservable();
  }

  public clear(): void {
    this.$data.next(EMPTY_MESSAGE);
  }
}

const EMPTY_MESSAGE: ConfirmationPageModel = {
  message: '',
  steps: 0,
  page: '',
  active: 0,
  success: true,
  title: ''
};

export interface ConfirmationPageModel {
  title: any;
  message: string;
  steps: number;
  active: number;
  page: string;
  success: boolean;
}
