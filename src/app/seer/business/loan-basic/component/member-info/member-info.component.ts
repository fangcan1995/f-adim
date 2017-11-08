
import {Component, Input, OnInit} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";
import {SAVE, UPDATE} from "../../../../common/seer-table/seer-table.actions";
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";

@Component({
  selector: 'loan-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss']
})
export class MemberInfoComponent implements OnInit {

  @Input()
  private disabled: boolean = false;

  @Input()
  private member : any = {};

  private classNames: any = {"addressContainerClass": "form-group col-xs-12 col-md-12 col-lg-5 col-xlg-5"};

  private actions = [];

  constructor(private service: LoanBasicService , private _messageService: SeerMessageService,){}

  ngOnInit(): void { if(!this.disabled) { this.actions = [ SAVE ] } else { this.actions = [] } }

  //地址快捷方式
  private shortcut($event): void {
    if($event.toElement.checked) {
      this.member.liveProvince = this.member.domicileProvince;
      this.member.liveCity = this.member.domicileCity;
      this.member.liveDistrict = this.member.domicileDistrict;
      this.member.liveAddress = this.member.domicileAddress;
    }
  }

  //户籍所在地
  domicilePlaceChanged($event) {
    this.member.domicileProvince = $event.province.item_code;
    this.member.domicileCity = $event.city.item_code;
    this.member.domicileDistrict = $event.district.item_code;
    this.member.domicileAddress = $event.address;
  }

  //目前居住地
  currentResidenceChanged($event) {
    this.member.liveProvince = $event.province.item_code;
    this.member.liveCity = $event.city.item_code;
    this.member.liveDistrict = $event.district.item_code;
    this.member.liveAddress = $event.address;
  }

  //保存
  private save(): void {

    let params = {
      "memberId": this.member.memberId,
      "userName": this.member.account,
      "trueName": this.member.userName,
      "phoneNumber": this.member.phoneNumber,
      "idNumber": this.member.idNumber,
      "mSex": this.member.msex,
      "mAge": this.member.mage,
      "education": this.member.education,
      "maritaStatus": this.member.maritaStatus,
      "domicileProvince": this.member.domicileProvince,
      "domicileCity": this.member.domicileCity,
      "domicileDistrict": this.member.domicileDistrict,
      "domicileAddress": this.member.domicileAddress,
      "liveProvince": this.member.domicileProvince,
      "liveCity": this.member.liveCity,
      "liveDistrict": this.member.liveDistrict,
      "liveAddress": this.member.liveAddress,
      "assetDesc": this.member.assetDesc,
      "debtDesc": this.member.debtDesc
    };

    this.service.updateMember(params).then(res => {
      if(0 == res.code) {
        this.showSuccess(res.msg || '保存成功');
      } else {
        this.showError(res.msg || '保存失败');
      }
    });
  }

  showSuccess(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-check',
      autoHideDuration: 3000,
    })
  }

  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }


}
