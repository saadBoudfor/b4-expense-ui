import {Component, OnInit} from '@angular/core';
import {ConfigService} from "./b4-common/services/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  theme: string = '';

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('theme');
    this.configService.theme.next(!!saved ? saved : '');
    this.configService.theme.subscribe(theme => {
      this.theme = theme
      console.log('save theme', theme)
      localStorage.setItem('theme', theme);
    })
  }

}
