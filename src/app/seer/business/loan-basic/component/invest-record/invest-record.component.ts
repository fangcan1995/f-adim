
import {Component, Input, OnInit} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";
import {UPDATE} from "../../../../common/seer-table/seer-table.actions";

@Component({
  selector: 'invest-record',
  templateUrl: './invest-record.component.html',
  styleUrls: ['./invest-record.component.scss']
})
export class InvestRecordComponent implements OnInit {

  @Input() readOnly: boolean = false;

  @Input() investRecords = [];

  public actions = [ UPDATE ];

  constructor(private service: LoanBasicService){}

  ngOnInit() {}



}
