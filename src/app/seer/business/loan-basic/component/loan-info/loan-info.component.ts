
import {Component, Input, OnInit} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";
import {SAVE, UPDATE} from "../../../../common/seer-table/seer-table.actions";

@Component({
  selector: 'loan-info',
  templateUrl: './loan-info.component.html',
  styleUrls: ['./loan-info.component.scss']
})
export class LoanInfoComponent implements OnInit {

  @Input()
  private disabled: boolean = false;

  @Input() loan = {};

  private actions = [];

  constructor(private service: LoanBasicService){}

  ngOnInit(): void { if(!this.disabled) { this.actions = [ SAVE ] } else { this.actions = [] } }

  private save(): void {
    this.service.updateLoan(this.loan).then((res => {
      console.log(res);
      alert(res.message);
    }));
  }


}
