import { Component } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent {
  constructor(private _router: Router){}
  handleBackBtnClick() {

    this._router.navigate(['/basic-info/member/'])
  }
}
