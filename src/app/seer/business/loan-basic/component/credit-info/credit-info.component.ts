
import {Component, Input, OnInit} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";
import {UPDATE} from "../../../../common/seer-table/seer-table.actions";

@Component({
  selector: 'credit-info',
  templateUrl: './credit-info.component.html',
  styleUrls: ['./credit-info.component.scss']
})
export class CreditInfoComponent implements OnInit {

  @Input()
  private disabled: boolean = false;

  @Input() credits = [];

  public actions = [ UPDATE ];

  constructor(private service: LoanBasicService){}

  ngOnInit() {
    if(!this.disabled) { this.actions = [ UPDATE ]; }else {this.actions = []; }
  }



}
