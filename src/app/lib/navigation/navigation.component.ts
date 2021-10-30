import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input()
  title: string | undefined;
  @Input()
  leftAction: string | undefined;
  @Input()
  rightAction: string | undefined;

  @Input()
  leftIcon = 'arrow_back_ios';
  @Input()
  rightIcon = 'close';

  @Input()
  color!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
