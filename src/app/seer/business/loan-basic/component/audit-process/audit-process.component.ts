
import {Component, Input, OnInit} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";
import {UPDATE} from "../../../../common/seer-table/seer-table.actions";

@Component({
  selector: 'audit-process',
  templateUrl: './audit-process.component.html',
  styleUrls: ['./audit-process.component.scss']
})
export class AuditProcessComponent implements OnInit {

  @Input() data = [];

  title = [
    {key:'activityName',label:'审批流程'},
    {key:'auditTime',label:'审批时间'},
    {key:'operator',label:'操作人员'},
    {key:'auditResult',label:'审批结果'},
  ];

  public actions = [ UPDATE ];

  constructor(private service: LoanBasicService){}

  ngOnInit() {}



}
