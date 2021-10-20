import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ConfirmationPageModel, ConfirmationService} from "../services/confirmation.service";

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  message: any;
  data!: ConfirmationPageModel;

  constructor(private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.confirmationService.setData({
      message: 'Le produit Coca zero à été sauvegardé avec succès. Merci de contribuer à la base de données B4Expenses 😇😇',
      steps: 2,
      active: 1,
      page: '/new-product',
      success: true
    })
    this.confirmationService.getData().subscribe(data => {
      this.data = data;
    })
  }

  ngOnDestroy(): void {
  }

}
