
import {Component, OnChanges, OnInit, TemplateRef} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import { Location } from '@angular/common';
import {FormsService} from "../forms.service";
import {SeerMessageService} from "../../../../theme/services/seer-message.service";
import { FileUploader} from "ng2-file-upload";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

import {SeerDialogService} from "../../../../theme/services/seer-dialog.service";

@Component({
  templateUrl: './transfer-audit.component.html',
  styleUrls: ['./transfer-audit.component.scss']
})
export class TransferAuditComponent implements OnInit , OnChanges{

  public id: string;
  isLoading: boolean = true;

  //会员信息
  public member: any = {}; public vehicles: any = []; public houses: any = []; public credits: any = [];public transfer:any={};
  public classNames: any = {"addressContainerClass": "form-group col-xs-12 col-md-12 col-lg-5 col-xlg-4"}; //居住地样式

  //申请信息
  public loan: any = {}; public pawnRelation: any = {}; public pawnVehicle: any = {}; public pawnHouse: any = {}; public auditMaterials: any = [];

  //审核资料
  public progress: number = 0;
  public uploader:FileUploader;
  public imageType = ['jpg', 'jpeg', 'bmp', 'gif', 'png', 'svg'];

  //投资记录
  public investRecords = [];
  public investTitle = [
    {key:'account',label:'投资人账号'},
    {key:'trueName',label:'投资人姓名'},
    {key:'phoneNumber',label:'投资人手机号'},
    {key:'investAmount',label:'投资金额（元）'},
    {key:'investTime',label:'投资时间'},
    {key:'investWay',label:'投资方式',isDict: true, category: 'INVEST_WAY' },

    ];
  //还款记录
  public repayRecords = [];
  public repayTitle = [
    {key:'a',label:'期数'},
    {key:'b',label:'应还日期'},
    {key:'c',label:'实还日期'},
    {key:'d',label:'已还本金（元）'},
    {key:'e',label:'已还利息（元）'},
    {key:'f',label:'已还总额（元）',isDict: true, category: 'INVEST_WAY' },
    {key:'g',label:'还款状况',isDict: true, category: 'RPMT_STATUS' },
  ];

  //审核记录
  public auditProcessRecords = [];
  public auditProcessTitle = [
    {key:'taskName',label:'审批流程'},
    {key:'completeTime',label:'审批时间'},
    {key:'account',label:'操作账号'},
    {key:'operatorName',label:'操作人员'},
    {key:'opinion',label:'审批结果'}];

  constructor(private service: FormsService, private route: ActivatedRoute, private _dialogService: SeerDialogService,
              private _location: Location, private modalService: BsModalService, private _messageService: SeerMessageService){
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {params['id']? this.id = params['id']:"";
      this.getTransferDetail(this.id);
      this.getTransferAuditRecords(this.id);
    });
  }

  ngOnChanges() { }

  //查询会员信息
  public getProjectMember(projectId: string) {
    this.isLoading = true;
    this.service.getProjectMember(projectId).then((res) => {
      if("0" == res.code) {
        this.member = res.data.baseInfo; this.vehicles = res.data.vehicles;this.houses = res.data.houses; this.credits = res.data.credits;
      }else {
        console.log("fail");
      }
      this.isLoading = false;
    }).catch(err => {
      this.isLoading = false;
      this.showError( err.msg || '获取贷款信息失败！' )
    });
  }

  //查询项目信息（借款信息）
  public getProjectDetail(projectId: string) {
    this.service.getProjectDetail(projectId).then((res) => {
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

 //查询债转项目信息（借款信息）
  public getTransferDetail(id: string) {
    this.service.getTransferDetail(id).then((res) => {
      if("0" == res.code) {
        this.transfer = res.data;
        let projectId=this.transfer.projectId;
        this.getProjectDetail(projectId);
        this.getProjectMember(projectId);
        this.getInvestRecords(projectId);
      }else {
        console.log("fail");
      }
    }).catch(err => { this.showError('获取债转信息失败！' ) });
  }
  //查询标的投资记录
  public getInvestRecords(projectId: string) {
    this.service.getLoanInvestRecords(projectId).then((res) => {
      if("0" == res.code) {
        this.investRecords = res.data;
        console.log(res.data);
      }else {
        this.showError(res.message)
      }
    }).catch(err => { this.showError('获取投资记录失败！' ) });
  }

  //查询标的审批记录
  public getAuditRecords(projectId: string) {
    this.service.getProjectAuditRecords(projectId).then((res) => {
      if("0" == res.code) {
        res.data[0].taskName=`债权转让审核`;
        res.data[0].opinion=`同意发布`;
        res.data[1].taskName=`满标`;
        res.data[1].account=``;
        res.data[1].operatorName=``;
        res.data[1].completeTime="2018-05-30 12:30:25";
        res.data[1].opinion=``;
        res.data.push({account:`admin`,taskName:`满标审核`,opinion:`同意划转`,operatorName: "方灿",assigneeId: "0e86acccf5864557abf51b54a9669f00",
          completeTime: "2018-05-30 14:56:52"})
        console.log('审批信息');
        console.log(res.data);
        this.auditProcessRecords = res.data;
      }else {
        this.showError(res.message)
      }
    }).catch(err => { this.showError('获取审批记录失败！' ) });
  }

  //查询债转标的审批记录
  public getTransferAuditRecords(projectId: string) {
    this.service.getTransferProjectAuditRecords(projectId).then((res) => {
      if("0" == res.code) {
        /*res.data[0].taskName=`债权转让审核`;
        res.data[0].opinion=`同意发布`;
        res.data[1].taskName=`满标`;
        res.data[1].account=``;
        res.data[1].operatorName=``;
        res.data[1].completeTime="2018-05-30 12:30:25";
        res.data[1].opinion=``;
        res.data.push({account:`admin`,taskName:`满标审核`,opinion:`同意划转`,operatorName: "方灿",assigneeId: "0e86acccf5864557abf51b54a9669f00",
          completeTime: "2018-05-30 14:56:52"})
        console.log('审批信息');
        console.log(res.data);*/
        this.auditProcessRecords = res.data;
      }else {
        this.showError(res.message)
      }
    }).catch(err => { this.showError('获取债转审批记录失败123！' ) });
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
