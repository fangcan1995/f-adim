
import {Component, OnChanges, OnInit, TemplateRef} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import { Location } from '@angular/common';
import {FormsService} from "../forms.service";
import {SeerMessageService} from "../../../../theme/services/seer-message.service";
import { FileUploader} from "ng2-file-upload";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

import {SeerDialogService} from "../../../../theme/services/seer-dialog.service";

@Component({
  templateUrl: './loan-second-audit.component.html',
  styleUrls: ['./loan-second-audit.component.scss']
})
export class LoanSecondAuditComponent implements OnInit , OnChanges{

  public id: string;


  //会员信息
  public member: any = {}; public vehicles: any = []; public houses: any = []; public credits: any = [];
  public classNames: any = {"addressContainerClass": "form-group col-xs-12 col-md-12 col-lg-5 col-xlg-4"}; //居住地样式

  //申请信息
  public loan: any = {}; public pawnRelation: any = {}; public pawnVehicle: any = {}; public pawnHouse: any = {}; public auditMaterials: any = [];

  //审核资料
  public progress: number = 0;
  public uploader:FileUploader;
  public imageType = ['jpg', 'jpeg', 'bmp', 'gif', 'png', 'svg'];

  //投资记录
  public investRecords = [];
  public investTitle = [{key:'activityName',label:'审批流程'}, {key:'auditTime',label:'审批时间'}, {key:'operator',label:'操作人员'}, {key:'auditResult',label:'审批结果'},];

  //审核记录
  public auditProcessRecords = [];
  public auditProcessTitle = [{key:'taskName',label:'审批流程'}, {key:'completeTime',label:'审批时间'}, {key:'account',label:'员工账号'}, {key:'operatorName',label:'员工姓名'},{key:'opinion',label:'审批意见'}];

  constructor(private service: FormsService, private route: ActivatedRoute, private _dialogService: SeerDialogService,
              private _location: Location, private modalService: BsModalService, private _messageService: SeerMessageService){
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {params['id']? this.id = params['id']:"";
      this.getLoanMember(this.id);
      this.getLoanApply(this.id);
      this.getAuditRecords(this.id);
    });
  }

  ngOnChanges() { }

  //查询会员信息
  public getLoanMember(loanApplyId: string) {
    this.service.getLoanMember(loanApplyId).then((res) => {
      if("0" == res.code) {
        this.member = res.data.baseInfo; this.vehicles = res.data.vehicles;this.houses = res.data.houses; this.credits = res.data.credits;
      }else {
        console.log("fail");
      }
    }).catch(err => { this.showError( err.msg || '获取贷款信息失败！' ) });
  }

  //查询申请信息
  public getLoanApply(loanApplyId: string) {
    this.service.getLoanApply(loanApplyId).then((res) => {
      if("0" == res.code) {
        this.loan = res.data.loanBase;
        this.pawnRelation = res.data.pawnRelation;
        this.pawnVehicle = res.data.pawnVehicle;
        this.pawnHouse = res.data.pawnHouse;
        this.auditMaterials = res.data.auditMaterials;
      }else {
        console.log("fail");
      }
    }).catch(err => { this.showError('获取申请信息失败！' ) });
  }

  //查询申请信息
  public getAuditRecords(loanApplyId: string) {
    this.service.getLoanAuditRecords(loanApplyId).then((res) => {
      if("0" == res.code) {
        this.auditProcessRecords = res.data;
      }else {
        this.showError(res.message)
      }
    }).catch(err => { this.showError('获取审批记录失败！' ) });
  }

  //提交审核
  public auditResult: string = "pass"; public auditOpinion: string = ""; public auditReason: string = "";
  public submitAudit(){

    //提交审核
    this._dialogService.confirm('是否确认提交审核?', [{type: 1, text: '确认',}, {type: 0, text: '取消',},]).subscribe(action => {
      if (action === 1) {
        //提交
        let param = {"auditResult": this.auditResult, "opinion": this.auditReason + " " + this.auditOpinion};
        this.service.loanApplyAudit(this.loan.loanApplyId, param).then(res =>{
          if(0 == res.code) {
            this.showSuccess(res.message);
            this.handleBackBtnClick();
          }else {
            this.showError(res.message);
          }
        }).catch(error => {
          this.showError('操作失败')
        });
      }
    })
  }

  //弹出层
  public modalRef: BsModalRef;
  public openModal( template: TemplateRef<any>) { this.modalRef = this.modalService.show(template); }

  //新增车辆弹出层
  public vehicle: any = {};
  private vehicleReadOnly: boolean = true;
  public vehicleModal(template: TemplateRef<any>, vehicleReadOnly: boolean, vehicle?: any) {

    if(vehicleReadOnly) {
      this.vehicle = vehicle;
    }else {
      this.vehicle = {};
    }
    this.vehicleReadOnly = vehicleReadOnly;
    this.openModal(template);
  }

  //新增房产弹出层
  public house: any = {};
  private houseReadOnly: boolean = true;
  public houseModal(template: TemplateRef<any>,houseReadOnly, house?: any) {

    if(houseReadOnly) {
      this.house = house;
    }else {
      this.house = {};
    }
    this.houseReadOnly = houseReadOnly;
    this.openModal(template);
  }

  //下载审批资料
  public downloadFile(item) {
    this.service.downloadFile(this.loan.loanApplyId, item.id).then(res => {
      var blob = res.blob();
      var a = document.createElement('a');
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = item.fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
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

  //返回
  handleBackBtnClick() {this._location.back();}

  //成功提示
  showSuccess(message: string) { return this._messageService.open({message, icon: 'fa fa-check', autoHideDuration: 3000,})}

  //失败提示
  showError(message: string) { return this._messageService.open({message, icon: 'fa fa-times-circle', autoHideDuration: 3000,})}

}
