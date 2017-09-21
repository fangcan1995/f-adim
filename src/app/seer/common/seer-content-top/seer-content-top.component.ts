import { Component, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'seer-content-top',
  templateUrl: './seer-content-top.component.html',
  styleUrls: [ './seer-content-top.component.scss' ],
})
export class SeerContentTopComponent{
  @ViewChild('contentTop') contentTop:ElementRef;
  constructor() {}

  ngAfterViewInit() {

  }

}