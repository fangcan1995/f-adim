
import {Component, OnChanges, OnInit, TemplateRef} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { Location } from '@angular/common';
import {FormsService} from "../forms.service";
import {SAVE, SAVE_DISABLE} from "../../../common/seer-table/seer-table.actions";
import {SeerMessageService} from "../../../../theme/services/seer-message.service";
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {getStorage} from "../../../../theme/libs/utils";
import * as _ from 'lodash';
import {SeerDialogService} from "../../../../theme/services/seer-dialog.service";
import {BASE_URL} from "../../../../theme/services/base.service";

declare let laydate;

@Component({
  templateUrl: './loan-complete-audit.component.html',
  styleUrls: ['./loan-complete-audit.component.scss']
})
export class LoanCompleteAuditComponent implements OnInit , OnChanges{

  isLoading: boolean = true;

  public id: string;
  public actions = [ SAVE_DISABLE ];

  public forbidLoanSaveBtn = true;
  public forbidMemberSaveBtn = true;
  public forbidAuditSubmitBtn = true;

  //会员信息
  public member: any = {};
  public vehicles: any = [];
  public houses: any = [];
  public classNames: any = {"addressContainerClass": "form-group col-xs-12 col-md-12 col-lg-5 col-xlg-4"}; //居住地样式
  public creditInfo: any = [];
  riskReport:any = {};//征信_个人风险报告
  creditReport:any = {};//征信_个人信用报告
  public antiFraudReport:any = {};//征信_个人反欺诈报告

  //申请信息
  public loan: any = {};
  public pawnRelation: any = {};
  public pawnVehicle: any = {};
  public pawnHouse: any = {};
  public auditMaterials: any = [];

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

  constructor(
    private service: FormsService,
    private route: ActivatedRoute,
    private _dialogService: SeerDialogService,
    private _location: Location,
    private modalService: BsModalService,
    private _messageService: SeerMessageService){
  }

  //审核记录
  projectProgres:any;
  ngOnInit() {
    this.projectProgres = _.cloneDeep(this.service.projectProgres);
    this.route.params.subscribe((params: Params) => {params['id']? this.id = params['id']:"";
      this.getLoanMember(this.id);
      this.getLoanApply(this.id);
      this.getAuditRecords(this.id);
      this.initUploader();
    });

    laydate.render({
      elem: '#loanBeginDate',
      type: 'datetime',
      trigger: 'click',
      format: 'yyyy-MM-dd',
      done: (value, date, endDate) => {
        this.loan.loanBeginDate = value;
        console.log(this.loan.loanBeginDate);
      }
    })

    laydate.render({
      elem: '#loanEndDate',
      type: 'datetime',
      trigger: 'click',
      format: 'yyyy-MM-dd',
      done: (value, date, endDate) => {
        this.loan.loanEndDate = value;
        console.log(this.loan.loanEndDate);
      }
    })
  }

  ngOnChanges() {
    this.initUploader()
  }

  //查询会员信息
  public getLoanMember(loanApplyId: string) {
    this.isLoading = true;
    this.service.getLoanMember(loanApplyId).then((res) => {
      if("0" == res.code) {
        console.log('会员信息');
        console.log(res.data);
        this.member = res.data.baseInfo;
        this.vehicles = res.data.vehicles;
        this.houses = res.data.houses;
        this.creditInfo = res.data.credits;
        this.riskReport = this.findReport("1",this.creditInfo||[]);
        this.creditReport = this.findReport("2",this.creditInfo||[]);
        this.antiFraudReport = this.findReport("3",this.creditInfo||[]);
      }else {
        console.log("fail");
      }
      this.isLoading = false;
    }).catch(err => {
      this.isLoading = false;
      this.showError( err.msg || '获取贷款信息失败！' )
    });
  }
//查找征信
  findReport(type,reportList){
    let index = reportList.findIndex(report=>report!=null&&report.creditType == type);
    if(index >= 0){
      return reportList[index];
    }else{
      return {};
    }
  }
  //查询征信信息
  requery(type){
    //提示用户是否重新获取
    this._dialogService.confirm('获取信用报告是要收取一定费用且24小时之内获取的报告相同是否继续查询？')
      .subscribe(action => {
        if (action === 1) {
          this.service.getCreditByType(this.member.memberId, type).then((data:any)=>{
            switch(type){
              case 1:
                this.riskReport = data.data;
                break;
              case 2:
                this.creditReport =  data.data;
                break;
              case 3:
                this.antiFraudReport =  data.data;
                break
            }
            this.showSuccess(data.msg || '查询成功！');
          }).catch(err => {
            this.showError(err.msg || '查询失败！');
          });
        }else{
          return;
        }
      });
  }
  //查询申请信息
  public getLoanApply(loanApplyId: string) {
    this.isLoading = true;
    this.service.getLoanApply(loanApplyId).then((res) => {
      if("0" == res.code) {
        this.loan = res.data.loanBase;
        this.loan.raiseRate=0; //默认加息0
        this.pawnRelation = res.data.pawnRelation;
        this.pawnVehicle = res.data.pawnVehicle;
        this.pawnHouse = res.data.pawnHouse;
        this.auditMaterials = res.data.auditMaterials;
        this.initUploader();
      }else {
        console.log("fail");
      }
      this.isLoading = false;
    }).catch(err => {
      this.showError('获取申请信息失败！' )
      this.isLoading = false;
    });
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

  //保存会员信息
  public saveLoanMember() {

    this.forbidMemberSaveBtn = false;
    this.service.updateMember(this.member.memberId, this.member).then(res => {
      if(0 == res.code) {
        this.showSuccess(res.message);
      } else {
        this.showError(res.message);
      }
      this.forbidMemberSaveBtn = true;
    }).catch(err => {
      this.showError( err.msg || '保存失败' );
      this.forbidMemberSaveBtn = true;
    });

  }

  //保存申请信息
  public saveLoanApply() {

    this.service.updateLoanApply(this.loan.loanApplyId, this.loan).then(res => {
      if(0 == res.code) {
        this.showSuccess(res.message);
      } else {
        this.showError(res.message);
      }
    }).catch(err => {this.showError( err.msg || '保存失败' );});

  }

  //提交审核
  public auditResult: string = "pass"; public auditOpinion: string = ""; public auditReason: string = "";
  public submitAudit(){

    //提交审核
    this._dialogService.confirm('是否确认提交审核?', [{type: 1, text: '确认',}, {type: 0, text: '取消',},]).subscribe(action => {
      if (action === 1) {
        this.isLoading = true;
        //完善会员
        this.service.updateMember(this.member.memberId, this.member).then(res => {
          if(0 == res.code) {
          } else {
            this.showError(res.message);
          }
        }).catch(err => {
          this.isLoading = false;
          this.showError( err.msg || '保存失败' );
        });

        //完善借款
        this.service.updateLoanApply(this.loan.loanApplyId, this.loan).then(res => {
          if(0 == res.code) {
          } else {
            this.showError(res.message);
          }
        }).catch(err => {
          this.isLoading = false;
          this.showError( err.msg || '保存失败' );
        });

        //提交
        let param = {"auditResult": this.auditResult, "opinion": this.auditReason + " " + this.auditOpinion};
        this.service.loanApplyAudit(this.loan.loanApplyId, param).then(res =>{
          this.isLoading = false;
          if(0 == res.code) {
            this.showSuccess(res.message);
            this.handleBackBtnClick();
          }else {
            this.showError(res.message);
          }

        }).catch(error => {
          this.isLoading = false;
          this.showError('操作失败')
        });
      }
    })
  }

  //设置抵押车辆
  public setVehicle($event, vehicle) {
    $event.preventDefault();
    let params = {"vehicleId": vehicle.id};
    this.service.pawnVehicle(this.loan.loanApplyId, params).then(res => {
      if("0" == res.code) {
        this.pawnVehicle = vehicle ;
        this.pawnRelation = res.data;
        this.showSuccess('设置抵押物成功');
      }else {
        this.showSuccess('设置抵押物成功');
      }
    }).catch(err => {
      this.showError('设置抵押物失败' );
    });
  }

  //设置抵押房产
  public setHouse($event, house) {
    $event.preventDefault();
    let params = {"houseId": house.id};
    this.service.pawnHouse(this.loan.loanApplyId, params).then(res => {
      if("0" == res.code) {
        this.pawnHouse = house;
        this.pawnRelation.mortId = house.id;
        this.showSuccess('设置抵押物成功');
      }else {
        this.showError( '设置抵押物失败' );
      }
    }).catch(err => {
      this.showError( '设置抵押物失败' );
    });
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

  //添加车辆
  public addVehicle(vehicle) {
    vehicle['memberId'] = this.member.memberId;
    this.service.addVehicle(this.member.memberId, vehicle).then(res =>{
      if(0 == res.code) {
        vehicle.id = res.data.id;
        this.vehicles.push(vehicle);
        this.modalRef.hide();
      }else {
        this.showSuccess(res.message);
      }
    }).catch(error => {
      this.showError('操作失败')
    });
  }

  //添加房产
  public addHouse(house) {
    house['memberId'] = this.member.memberId;
    this.service.addHouse(this.member.memberId, house).then(res =>{
      if(0 == res.code) {
        house.id = res.data.id;
        this.houses.push(house);
        this.modalRef.hide();
      }else {
        this.showSuccess(res.message);
      }
    }).catch(error => {
      this.showError('操作失败')
    });
  }


  //初始化上传组件(初始化定义uploader变量,用来配置input中的uploader属性)
  initUploader() {
    const token = getStorage({ key: 'token' });
    const tokenType = token.token_type;
    const accessToken = token.access_token;
    let headers = [{name: 'Authorization', value: `${tokenType} ${accessToken}`}];
    this.uploader = new FileUploader({ url: BASE_URL + `/loans/${this.loan.loanApplyId}/material`, method: "POST", headers:headers,});
    this.uploader.onSuccessItem = this.successItem.bind(this);
    this.uploader.onCompleteAll = this.onCompleteAll.bind(this);
  }

  //上传成功回调
  successItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders):any{
    if (status == 200) {
      // 上传文件后获取服务器返回的数据
      let tempRes = JSON.parse(response);
      this.auditMaterials.push(tempRes.data);
      let fileLength = this.uploader.queue.length;
      this.progress += Math.round(100/fileLength);
      //this.showSuccess("上传成功！")
    }else {
      // 上传文件后获取服务器返回的数据错误
      console.log("上传失败");
      this.showError("上传失败！")
    }
  }

  //全部上传完成回调
  public onCompleteAll(): any { this.uploader.clearQueue(); this.progress = 0; }

  //上传审批资料
  public uploadFile() {_.forEach(this.uploader.queue, (t, i) => { this.uploader.queue[i].upload()})}

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

  //删除审批资料
  public deleteFile(item, i) {

    this._dialogService.confirm('是否确认删除?', [{type: 1, text: '确认',}, {type: 0, text: '取消',},]).subscribe(action => {
      if (action === 1) {
        this.service.deleteFile(this.loan.loanApplyId, item.id).then( res =>{
          if(0 == res.code){
            this.auditMaterials.splice(i, 1);
          }else {
            this.showError(res.message);
          }
        }).catch(err => {
          this.showError(err.msg);
        });
      }
    });
  }

  //地址快捷方式
  public shortcut($event): void {
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

  //返回
  handleBackBtnClick() {this._location.back();}

  //成功提示
  showSuccess(message: string) { return this._messageService.open({message, icon: 'fa fa-check', autoHideDuration: 3000,})}

  //失败提示
  showError(message: string) { return this._messageService.open({message, icon: 'fa fa-times-circle', autoHideDuration: 3000,})}

}
