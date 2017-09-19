import {Component, ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'seer',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <router-outlet></router-outlet>
      </div>
    </div>
    <ba-back-top position="200"></ba-back-top>
    <seer-message></seer-message>
    <seer-dialog></seer-dialog>
    `
})
export class SeerComponent {

  constructor() {
  }

  ngOnInit() {
  }
}
