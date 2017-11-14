
import {Component, OnChanges, OnInit, TemplateRef} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import { Location } from '@angular/common';
import {CommonService} from "../../common.service";
@Component({
  templateUrl: './create-intention.component.html',
  styleUrls: ['./create-intention.component.scss']
})
export class CreateIntentionComponent implements OnInit, OnChanges {

  private member: any = {}; //会员信息

  private loan: any = {}; //借款信息

  private vehicles: any = []; //车辆信息

  private houses: any = []; //房屋信息

  private credits: any = []; //信用信息

  private attachment: any = []; //审核资料（附件）

  private investRecords: any = []; //投资信息

  private auditHistory: any = []; //审核记录

  private loanType: any = {};

  private pawn: any = {}; //抵押物信息

  private id: string;

  private submitData: any = {};

  private keywords: string = "";

  private members: any[] = []; //待选会员

  constructor(
    private service: CommonService,
    private route: ActivatedRoute,
    private _router: Router,
    private _messageService: SeerMessageService,
    private modalService: BsModalService,
    private _location: Location
    ){}

  ngOnInit() {


  }

  ngOnChanges() {

  }

  private choose(item) {
      this.member = item;
      this.keywords = this.member.trueName;
  }

  private fuzzySearch() {
    if(this.keywords != "") {
      let param = {"pageNum":"1", "pageSize": "10000","sortBy": "-createTime", "trueName": this.keywords};
      this.service.fuzzySearch(param).then(res => {
        if(res.code == 0) {
          this.members = res.data.list;
        }else {
          console.log(res.message);
          this.showError("查询会员失败");
        }
      });
    }
  }

  //弹出层
  public modalRef: BsModalRef;
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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

  handleBackBtnClick() {
    this._location.back();
  }

  private chooseMember(template: TemplateRef<any>) {
    this.openModal(template);
  }

  private submit(){

    if(this.member != {}) {
      this.loan.memberId = this.member.id;
      this.service.createIntention(this.loan).then(res => {
        if(0 == res.code) {
          this.showSuccess(res.msg || '已提交');
          this._router.navigate(['business/intention']);
        } else {
          this.showError(res.msg || '提交失败');
        }
      });
    }else {
      this.showError("请选择会员");
    }
  }
}
