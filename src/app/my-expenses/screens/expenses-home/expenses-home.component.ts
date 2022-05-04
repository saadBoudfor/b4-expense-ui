import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../../b4-common/services/config.service";

@Component({
  selector: 'expenses-home',
  templateUrl: './expenses-home.component.html',
  styleUrls: ['./expenses-home.component.scss']
})
export class ExpensesHomeComponent implements OnInit, OnDestroy {

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.showNavBar();
  }

  ngOnDestroy(): void {
    this.configService.hideNavBar();
  }

}
