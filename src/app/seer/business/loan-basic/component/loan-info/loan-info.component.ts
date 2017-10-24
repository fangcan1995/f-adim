
import {Component, Input, OnInit} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";
import {UPDATE} from "../../../../common/seer-table/seer-table.actions";

@Component({
  selector: 'loan-info',
  templateUrl: './loan-info.component.html',
  styleUrls: ['./loan-info.component.scss']
})
export class LoanInfoComponent implements OnInit {

  @Input()
  private disabled: boolean = false;

  @Input() loan = {};

  public actions = [ UPDATE ];

  constructor(private service: LoanBasicService){}

  ngOnInit() {
    if(!this.disabled) {
      this.actions = [ UPDATE ] ;
    }else {
      this.actions = [];
    }
  }



}
