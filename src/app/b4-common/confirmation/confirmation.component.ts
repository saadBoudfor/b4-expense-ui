import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationPageModel, ConfirmationService} from "../services/confirmation.service";

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  data!: ConfirmationPageModel;

  constructor(private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.confirmationService.getData().subscribe(data => {
      this.data = data;
    })
  }

  ngOnDestroy(): void {
  }

}
