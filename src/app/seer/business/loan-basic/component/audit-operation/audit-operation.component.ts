
import {Component, Input, OnInit} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";
import {UPDATE} from "../../../../common/seer-table/seer-table.actions";

@Component({
  selector: 'audit-operation',
  templateUrl: './audit-operation.component.html',
  styleUrls: ['./audit-operation.component.scss']
})
export class AuditOperationComponent implements OnInit {



  constructor(private service: LoanBasicService){}

  ngOnInit() {

  }



}
