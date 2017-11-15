import { Component } from '@angular/core';
@Component({
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent {
  handleBackBtnClick() {
    location.reload();
  }
}
