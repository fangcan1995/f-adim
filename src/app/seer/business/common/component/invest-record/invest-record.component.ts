
import {Component, Input, OnInit} from "@angular/core";

import {CommonService} from "../../common.service";
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

  constructor(private service: CommonService){}

  ngOnInit() {}



}
