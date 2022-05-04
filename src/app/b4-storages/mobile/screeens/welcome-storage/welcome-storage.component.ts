import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../../../../b4-common/services/config.service";

@Component({
  selector: 'welcome-storage',
  templateUrl: './welcome-storage.component.html',
  styleUrls: ['./welcome-storage.component.scss']
})
export class WelcomeStorageComponent implements OnInit, OnDestroy {

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.configService.showNavBar();
  }

  ngOnDestroy(): void {
    this.configService.hideNavBar();
  }

}
