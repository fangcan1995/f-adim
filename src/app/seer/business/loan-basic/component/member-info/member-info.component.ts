
import {Component, Input, OnInit} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";
import {SAVE, UPDATE} from "../../../../common/seer-table/seer-table.actions";

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

  constructor(private service: LoanBasicService){}

  ngOnInit(): void { if(!this.disabled) { this.actions = [ SAVE ] } else { this.actions = [] } }

  //户籍所在地
  private dimicilePlace = {};
  domicilePlaceChanged($event) {
    console.log($event);
    /*this.member.domicileProvince = $event.province.item_code;
    this.member.domicileDistrict = $event.district.item_code;
    this.member.domicileAddress = $event.city.item_code;
    this.member.domicileAddress = $event.address;*/
  }

  //目前居住地
  private currentResidence = {};
  currentResidenceChanged($event) {
    /*console.log($event);
    this.currentResidence = $event;*/
  }

  private save(): void {
    this.service.updateMember(this.member).then((res => {
      console.log(res.code);
      alert(res.message);
    }));
  }




}
