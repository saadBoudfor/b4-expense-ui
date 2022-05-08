import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'mobile-navigation-menu',
  templateUrl: './mobile-lateral-menu.component.html',
  styleUrls: ['./mobile-lateral-menu.component.scss']
})
export class MobileLateralMenuComponent implements OnInit {

  theme = '';

  apps: { icon: string, label: string, active?: boolean, path?: string, action?: any }[] = apps;

  constructor(private router: Router, private configService: ConfigService) {
  }

  ngOnInit(): void {
    const savedAppsConfig = localStorage.getItem(localstorage_apps_id);
    if (!!savedAppsConfig) {
      this.apps = JSON.parse(savedAppsConfig);
    }
    this.configService.theme.subscribe(selected =>
      this.theme = selected
    )
  }

  select(selected: { icon: string; label: string; active?: boolean; path?: string; action?: any }) {
    if (selected.path) {
      this.router.navigate([selected.path]);
    }
    this.apps.forEach(app => {
      app.active = false;
    })
    selected.active = true;
    localStorage.setItem(localstorage_apps_id, JSON.stringify(this.apps));
  }
}

const apps = [
  {icon: 'account_balance_wallet', label: 'Dépenses', path: '/expenses/home', active: true},
  {icon: 'food_bank', path: '/storage', label: 'Stockage'},
  {icon: 'date_range', label: 'Planning'},
  {icon: 'person', label: 'Profile', path: '/settings'}
];

const localstorage_apps_id = 'apps_menu';
