
import {Component, Input, OnInit} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";
import {UPDATE} from "../../../../common/seer-table/seer-table.actions";

@Component({
  selector: 'audit-material',
  templateUrl: './audit-material.component.html',
  styleUrls: ['./audit-material.component.scss']
})
export class AuditMaterialComponent implements OnInit {

  @Input()
  private disabled: boolean = false;

  @Input() attachments = [];

  public actions = [ UPDATE ];

  constructor(private service: LoanBasicService){}

  ngOnInit() {}



}
