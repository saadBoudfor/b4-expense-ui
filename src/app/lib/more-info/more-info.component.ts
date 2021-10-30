import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent implements OnInit {

  @Input()
  title = '';

  constructor() { }

  ngOnInit(): void {
  }


}
