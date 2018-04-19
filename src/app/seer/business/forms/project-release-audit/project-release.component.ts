
import {Component, OnChanges, OnInit, TemplateRef} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { Location } from '@angular/common';
import {FormsService} from "../forms.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "ng2-validation";
import {SAVE_DISABLE} from "../../../common/seer-table/seer-table.actions";
import {SeerMessageService} from "../../../../theme/services/seer-message.service";
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {getStorage} from "../../../../theme/libs/utils";
import {BASE_URL, TEST_URL} from "../../../../theme/services/base.service";
import * as _ from 'lodash';
import {SeerDialogService} from "../../../../theme/services/seer-dialog.service";

@Component({
  templateUrl: './project-release.component.html',
  styleUrls: ['./project-release.component.scss']
})
export class ProjectReleaseComponent implements OnInit , OnChanges{

  public id: string;

  public actions = [ SAVE_DISABLE ];

  //会员信息
  public memberForm : FormGroup; public vehicleForm : FormGroup; public houseForm : FormGroup;
  public member: any = {}; public vehicles: any = []; public houses: any = []; public credits: any = [];
  public classNames: any = {"addressContainerClass": "form-group col-xs-12 col-md-12 col-lg-5 col-xlg-4"}; //居住地样式

  //申请信息
  public loanForm : FormGroup;
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
    this.formValidation()
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {params['id']? this.id = params['id']:"";
      this.getProjectMember(this.id);
      this.getProjectDetail(this.id);
      this.getAuditRecords(this.id);
      this.initUploader();
    });
  }

  ngOnChanges() {
    this.initUploader()
  }

  //表单验证
  protected formValidation() {

    //借款会员
    this.memberForm = new FormGroup({

      msex: new FormControl('', CustomValidators.min(0)), //性别

      mage: new FormControl('', CustomValidators.number), //年龄

      assetDesc: new FormControl('', Validators.required), //资产介绍

      debtDesc: new FormControl('', Validators.required), //债务介绍
    });

    //借款申请
    this.loanForm = new FormGroup({

      loanType: new FormControl('', CustomValidators.min(0)), //借款类型

      applyAmt: new FormControl('', CustomValidators.min(100)), //借款金额

      loanApplyExpiry: new FormControl('', CustomValidators.min(0)), //借款期限

      annualRate: new FormControl('', CustomValidators.min(0.01)), //年利率

      repayType: new FormControl('', CustomValidators.min(0)), //还款方式

      //借款用途

      serviceRate: new FormControl('', CustomValidators.min(0.01)), // 服务费

      minInvestAmount: new FormControl('', CustomValidators.min(0)), // 最小投资金额

      maxInvestAmount: new FormControl('', CustomValidators.min(0)), // 最大投资金额

    });

    //新增车辆
    this.vehicleForm = new FormGroup({

      //车辆品牌
      carBrand: new FormControl('', Validators.required),

      //车辆型号
      carModel: new FormControl('', Validators.required),

      //车架号
      viNumber: new FormControl('', Validators.required),

      //车牌号
      carNumber: new FormControl('', Validators.required),

      //登记证号
      carRegNumber: new FormControl('', Validators.required),

      //车龄
      //carAge: new FormControl('', Validators.required),

      //购车年份
      purchaseYear: new FormControl('', Validators.required),

      //行驶里程
      mileage: new FormControl('', Validators.required),

      //评估价格
      pricePotential: new FormControl('', Validators.required),

    });

    //新增房屋
    this.houseForm = new FormGroup({

      //房产地址
      houseAdress: new FormControl('', Validators.required),

      //房屋类型
      houseType: new FormControl('', CustomValidators.min(0)),

      //建筑面积
      area: new FormControl('', Validators.required),

      //房龄
      //houseAge: new FormControl('', Validators.required),

      //购车年份
      completionYear: new FormControl('', Validators.required),

      //尚欠贷余额
      debtMoney: new FormControl('', Validators.required),

      //土地所有证号
      landNo: new FormControl('', Validators.required),

      //房屋产权所有证号
      houseBelongNo: new FormControl('', Validators.required),

      //评估价格
      pricePotential: new FormControl('', Validators.required),

    });
  }

  //查询会员信息
  public getProjectMember(projectId: string) {
    this.service.getProjectMember(projectId).then((res) => {
      if("0" == res.code) {
        this.member = res.data.memberPersonDto; this.vehicles = res.data.vehicles;this.houses = res.data.houses; this.credits = res.data.credits;
      }else {
        console.log("fail");
      }
    }).catch(err => { this.showError( err.msg || '获取贷款信息失败！' ) });
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
        console.log(this.auditMaterials);
        this.initUploader();
      }else {
        console.log("fail");
      }
    }).catch(err => { this.showError('获取申请信息失败！' ) });
  }

  //查询申请信息
  public getAuditRecords(projectId: string) {
    this.service.getProjectAuditRecords(projectId).then((res) => {
      if("0" == res.code) {
        this.auditProcessRecords = res.data;
      }else {
        this.showError(res.message)
      }
    }).catch(err => { this.showError('获取审批记录失败！' ) });
  }

  //保存会员信息
  public saveLoanMember() {

      if(this.memberForm.valid) {
        let params = {
          "memberId": this.member.memberId,
          "userName": this.member.userName,
          "trueName": this.member.trueName,
          "phoneNumber": this.member.phoneNumber,
          "idNumber": this.member.idNumber,
          "mSex": this.member.mSex,
          "mAge": this.member.mAge,
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
        this.service.updateMember(this.member.memberId, params).then(res => {
          if(0 == res.code) {
            this.showSuccess('保存成功');
          } else {
            this.showError('保存失败');
          }
        }).catch(err => {this.showError( err.msg || '保存失败' );});
      } else{ this.showError("请按规则填写表单！") }

  }

  //保存申请信息
  public saveLoanApply() {

    if(this.loanForm.valid) {
      let params = {
        "loanApplyId": this.loan.loanApplyId,
        "loanType": this.loan.loanType,
        "applyAmt": this.loan.applyAmt,
        "loanApplyExpiry": this.loan.loanExpiry,
        "noviceLoan": this.loan.greenHand,
        "applyNum": this.loan.applyNum,
        "rate": this.loan.annualRate,
        //"mAge": this.loan.raiseRate,
        "repayType": this.loan.repayType,
        "handFee": this.loan.serviceRate,
        "loanPurpose": this.loan.loanPurpose,
        "minInvestAmount": this.loan.minInvestAmount,
        "maxInvestAmount": this.loan.maxInvestAmount
      };
      this.service.updateLoanApply(this.loan.loanApplyId, params).then(res => {
        if(0 == res.code) {
          this.showSuccess('保存成功');
        } else {
          this.showError('保存失败');
        }
      }).catch(err => {this.showError( err.msg || '保存失败' );});
    } else{ this.showError("请按规则填写表单！") }

  }

  //提交审核
  public auditResult: string = "pass"; public auditOpinion: string = ""; public auditReason: string = "";
  public submitAudit(){

    this._dialogService.confirm('是否确认提交审核?', [{type: 1, text: '确认',}, {type: 0, text: '取消',},]).subscribe(action => {
      if (action === 1) {
        let param = {"auditResult": this.auditResult, "opinion": this.auditReason + " " + this.auditOpinion};
        this.service.projectAudit(this.id, param).then(res =>{
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

  //设置抵押车辆
  public setVehicle($event, vehicle) {
    $event.preventDefault();
    let params = {"vehicleId": vehicle.id};
    this.service.pawnVehicle(this.loan.loanApplyId, params).then(res => {
      if("0" == res.code) {
        this.pawnVehicle = vehicle ;
        this.pawnRelation.mortId = vehicle.id;
      }else {
        console.log('设置抵押物失败');
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
      }else {
        console.log('设置抵押物失败' );
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
    this.service.addVehicle(this.member.memberId, vehicle).then(res =>{
      if(0 == res.code) {
        vehicle.id = res.data.id;
        this.vehicles.push(vehicle);
        this.modalRef.hide();
      }else {
        console.log(res.message);
        this.showSuccess('车辆添加失败');
      }
    }).catch(error => {
      console.log(error);
      this.showError('操作失败')
    });
  }

  //添加房产
  public addHouse(house) {
    this.service.addHouse(this.member.memberId, house).then(res =>{
      if(0 == res.code) {
        house.id = res.data.id;
        this.houses.push(house);
        this.modalRef.hide();
      }else {
        console.log(res.message);
        this.showSuccess('房屋添加失败');
      }
    }).catch(error => {
      console.log(error);
      this.showError('操作失败')
    });
  }


  //初始化上传组件(初始化定义uploader变量,用来配置input中的uploader属性)
  initUploader() {
    const token = getStorage({ key: 'token' });
    const tokenType = token.token_type;
    const accessToken = token.access_token;
    let headers = [{name: 'Authorization', value: `${tokenType} ${accessToken}`}];
    this.uploader = new FileUploader({ url: TEST_URL + `/loans/${this.loan.loanApplyId}/material`, method: "POST", headers:headers,});
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
