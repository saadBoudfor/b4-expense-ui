import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'action-container',
  templateUrl: './action-container.component.html',
  styleUrls: ['./action-container.component.scss']
})
export class ActionContainerComponent implements OnInit {

  @Input()
  leftLink!: string;

  @Input()
  title!: string;

  @Input()
  icon!: string;

  @Input()
  mainIcon!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
