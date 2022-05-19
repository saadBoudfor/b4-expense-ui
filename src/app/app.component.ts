import {AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ConfigService} from "./services/common/config.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, AfterContentChecked {
  theme: string = '';
  enableNavBar!: Observable<boolean>;

  constructor(private configService: ConfigService,
              private changeDetector: ChangeDetectorRef) {

  }

  ngAfterViewInit(): void {
    this.enableNavBar = this.configService.enableNavBar();
  }

  ngOnInit(): void {
    this.setTheme();
    this.configNavBar();
  }

  setTheme() {
    const saved = localStorage.getItem('theme');
    this.configService.theme.next(!!saved ? saved : '');
    this.configService.theme.subscribe(theme => {
      this.theme = theme
      localStorage.setItem('theme', theme);
    })
  }

  configNavBar() {
    this.enableNavBar = this.configService.enableNavBar();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

}

