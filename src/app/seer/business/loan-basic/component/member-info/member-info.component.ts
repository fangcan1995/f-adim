
import {Component, Input, OnInit} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";
import {UPDATE} from "../../../../common/seer-table/seer-table.actions";

@Component({
  selector: 'loan-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss']
})
export class MemberInfoComponent implements OnInit {

  @Input()
  private disabled: boolean = false;

  @Input()
  private member = {};

  private actions = [];

  private genderOptions = [{"code": "0","value":"男"}, {"code": "1","value":"女"}, {"code": "2","value":"其他"}];

  constructor(private service: LoanBasicService){}

  ngOnInit(): void {
    if(!this.disabled) {
      this.actions = [ UPDATE ] ;
    }else {
      this.actions = [];
    }
  }



}
