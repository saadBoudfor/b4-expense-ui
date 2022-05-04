import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  isDark = false;

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.showNavBar();
    this.configService.theme.subscribe(theme => {
      if (theme === 'dark-theme') {
        this.isDark = true;
      }
    })
  }

  changeTheme() {
    this.isDark = !this.isDark;
    this.configService.theme.next(this.isDark ? 'dark-theme' : '');
  }

  ngOnDestroy(): void {
    this.configService.hideNavBar();
  }
}
