import {Component, ViewEncapsulation} from '@angular/core';
import { GlobalState } from '../global.state';
@Component({
  selector: 'seer',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content" [class.fixedContentTop]=isContentTopFixed >
        <router-outlet></router-outlet>
      </div>
    </div>
    <ba-back-top position="200"></ba-back-top>
    <seer-message></seer-message>
    <seer-dialog></seer-dialog>
    `
})
export class SeerComponent {
  isContentTopFixed:boolean;
  constructor(
    private _state: GlobalState
    ) {
    this._state.subscribe('contentTop.fixed', res => {
      this.isContentTopFixed = res;
    })
  }

  ngOnInit() {
  }
}
