import {EventEmitter, Output} from '@angular/core';
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
  titleIcon: string | undefined;

  @Input()
  leftAction: string | undefined;

  @Input()
  rightAction: string | undefined;

  @Input()
  leftIcon = 'arrow_back_ios';

  @Input()
  rightIcon = 'close';

  // deprecated
  @Input()
  color!: string;

  @Input()
  ngColor: 'white' | 'primary' | 'accent' | 'warn' | '' = '';

  @Output()
  left = new EventEmitter();

  @Output()
  right = new EventEmitter();

  @Input()
  enableLeft = false;

  @Input()
  enableRight = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
