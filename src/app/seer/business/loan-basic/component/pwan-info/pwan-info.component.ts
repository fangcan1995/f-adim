
import {Component, Input, OnInit, TemplateRef} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";
import {UPDATE} from "../../../../common/seer-table/seer-table.actions";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'pwan-info',
  templateUrl: './pwan-info.component.html',
})
export class PwanInfoComponent implements OnInit {

  @Input()
  private disabled: boolean = false;

  @Input() vehicles = [];

  @Input() houses = [];

  public actions = [ UPDATE ];

  private vehicle;

  private house;

  constructor(private service: LoanBasicService, private modalService: BsModalService){}

  ngOnInit() {

    if(!this.disabled) { this.actions = [ UPDATE ]; }else {this.actions = []; }

  }

  //弹出层
  public modalRef: BsModalRef;
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


}
