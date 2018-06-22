import {Component, OnChanges, OnInit, TemplateRef} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import { Location } from '@angular/common';
import {FormsService} from "../forms.service";
import {SeerMessageService} from "../../../../theme/services/seer-message.service";
import { FileUploader} from "ng2-file-upload";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import * as _ from 'lodash';
import {SeerDialogService} from "../../../../theme/services/seer-dialog.service";
import {PREVIEW,DOWNLOAD} from "../../../common/seer-table/seer-table.actions";


@Component({
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit , OnChanges{

  public id: string;
  public method: string; //edit by lily
  public currentNode:number=0;
  isLoading: boolean = true;


  //会员信息
  public member: any = {};
  public vehicles: any = [];
  public houses: any = [];
  public creditInfo: any = [];
  public classNames: any = {"addressContainerClass": "form-group col-xs-12 col-md-12 col-lg-5 col-xlg-4"}; //居住地样式
  riskReport:any = {};//征信_个人风险报告
  creditReport:any = {};//征信_个人信用报告
  public antiFraudReport:any = {};//征信_个人反欺诈报告


  //申请信息
  public loan: any = {};
  public pawnRelation: any = {};
  public pawnVehicle: any=[];
  public pawnHouse: any = [];
  public auditMaterials: any = [];

  //审核资料
  public progress: number = 0;
  public uploader:FileUploader;
  public imageType = ['jpg', 'jpeg', 'bmp', 'gif', 'png', 'svg'];

  //投资记录
  public investRecords = [];
  public investTitle = [{key:'investAmount',label:'投资金额（元）'}, {key:'investTime',label:'投资时间'}, {key:'account',label:'投资人账号'}, {key:'trueName',label:'投资人姓名'}, {key:'phoneNumber',label:'投资人电话'},];

  //审核记录
  public auditProcessRecords = [];
  public auditProcessTitle = [{key:'taskName',label:'审批流程'}, {key:'completeTime',label:'审批时间'}, {key:'account',label:'员工账号'}, {key:'operatorName',label:'员工姓名'},{key:'opinion',label:'审批意见'}];
  creditActions:any = [PREVIEW,DOWNLOAD];
  auditMaterialsActions:any = [PREVIEW,DOWNLOAD];
  titlesCreditInfo=[
    { key:'creditType', label:'信用报告',textAlign:'center' },
    // { key:'creditLevel', label:'综合信用等级',textAlign:'center' },
    { key:'creditExpire', label:'有效日期',textAlign:'center' },
  ];//征信
  titlesAuditMaterials=[
    { key:'fileName', label:'附件名称' },
    { key:'uploadTime', label:'上传时间' },
  ];//附件
  titlesVehicleInfo= [
    { key:'carBrand', label:'车辆品牌',textAlign:'center' },
    { key:'carModel', label:'车辆型号' },
    { key:'viNumber', label:'车架号',textAlign:'center' },
    { key:'carNumber', label:'车牌号',textAlign:'center'},
    { key:'carRegNumber', label:'登记证号',textAlign:'center' },
    { key:'carAge', label:'购车年份',textAlign:'center' },
    { key:'mileage', label:'行驶里程',textAlign:'right' },
    { key:'pricePotential', label:'评估价格' ,textAlign:'right'},
  ]; //车
  titlesHouseInfo= [
    { key:'houseAdress', label:'房产地址' },
    { key:'area', label:'建筑面积',textAlign:'right' },
    { key:'houseType', label:'房屋类型', isDict: true, category: 'HOUSE_TYPE' ,textAlign:'center'  },
    { key:'houseAge', label:'竣工年份',textAlign:'center'},
    { key:'debtMoney', label:'尚欠贷余额',textAlign:'right' },
    { key:'landNo', label:'土地所有证号' ,textAlign:'center'},
    { key:'houseBelongNo', label:'房屋所有权证号',textAlign:'center' },
    { key:'pricePotential', label:'评估价格' ,textAlign:'right'},
    // { key:'loanYear', label:'贷款年限' },
    // { key:'debtBank', label:'按揭银行' },
    // { key:'houseScale', label:'产权份额' },
    // { key:'belongTo1', label:'所有权1' },
    // { key:'belongTo2', label:'所有权2' },
    // { key:'belongTo3', label:'所有权3' },
  ];//房

  constructor(
    private service: FormsService,
    private route: ActivatedRoute,
    private _dialogService: SeerDialogService,
    private _location: Location,
    private modalService: BsModalService,
    private _messageService: SeerMessageService){
  }
  //业务流程
  projectProgres:any;
  ngOnInit() {
    this.projectProgres = _.cloneDeep(this.service.projectProgres);

    this.route.params.subscribe((params: Params) => {
      params['id']? this.id = params['id']:"";
      params['method']? this.method = params['method']:"";
      console.log('当前方法')
      console.log(this.method);
      if(this.method==`loan_preview` || this.method==`loan-first-audit` || this.method==`loan-second-audit` ){
        this.getLoanMember(this.id);
        this.getLoanApply(this.id);
        this.getLoanAuditRecords(this.id);
      }else{
        this.getProjectMember(this.id);
        this.getProjectDetail(this.id);
        this.getInvestRecords(this.id);
        this.getAuditRecords(this.id);
      }

    });
  }


  ngOnChanges() { }

  //查询会员信息1
  public getProjectMember(projectId: string) {
    this.isLoading = true;
    this.service.getProjectMember(projectId).then((res) => {
      if("0" == res.code) {
        this.member = res.data.baseInfo;
        this.creditInfo = res.data.credits|| [];
        this.forCreditList();
        this.creditInfo = _.map(this.creditInfo, r => _.set(r, 'actions', [PREVIEW,DOWNLOAD]));
        this.riskReport = this.findReport("1",this.creditInfo||[]);
        this.creditReport = this.findReport("2",this.creditInfo||[]);
        this.antiFraudReport = this.findReport("3",this.creditInfo||[]);

      }else {
        console.log("fail");
      }
      this.isLoading = false;
    }).catch(err => {
      this.isLoading = false;
      this.showError( err.msg || '获取信息失败！' )
    });
  }

  //查询会员信息2
  public getLoanMember(loanApplyId: string) {
    this.isLoading = true;
    this.service.getLoanMember(loanApplyId).then((res) => {
      if("0" == res.code) {
        this.member = res.data.baseInfo;
        this.pawnVehicle = res.data.vehicles;
        this.pawnHouse = res.data.houses;

        /*this.pawnRelation = res.data.pawnRelation;
        this.pawnVehicle = [res.data.pawnVehicle];
        this.pawnHouse = [res.data.pawnHouse];
        this.auditMaterials = res.data.auditMaterials;
        this.auditMaterials = _.map(this.auditMaterials, r => _.set(r, 'actions', [PREVIEW,DOWNLOAD]));*/

        this.creditInfo = res.data.credits|| [];
        this.forCreditList();
        this.creditInfo = _.map(this.creditInfo, r => _.set(r, 'actions', [PREVIEW,DOWNLOAD]));
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
  //查询项目信息（标的）
  public getProjectDetail(projectId: string) {
    this.service.getProjectDetail(projectId).then((res) => {
      if("0" == res.code) {
        console.log('借款信息-----------');
        this.loan = res.data.loanBase;
        console.log(this.loan);
        switch (this.method) {
          case `preview`:
            if(this.loan.projectStatus==6){
              this.currentNode=8;
            }else if(this.loan.projectStatus==4){
              this.currentNode=7;
            }else if(this.loan.projectStatus==3){
              this.currentNode=6;
            } else if(this.loan.projectStatus==2){
              this.currentNode=5;
            }else if(this.loan.projectStatus==1){
              this.currentNode=4;
            }

            break;
          case `abortive`:
            this.currentNode=this.loan.projectStatus+1;
            this.auditResult='refuse';
            //流标
            break;
          case `project-release`:
            this.currentNode=4;
            break;
          default:

            break;
        }
        this.pawnRelation = res.data.pawnRelation;
        this.pawnVehicle = [res.data.pawnVehicle];
        this.pawnHouse = [res.data.pawnHouse];
        this.auditMaterials = res.data.auditMaterials;
        this.auditMaterials = _.map(this.auditMaterials, r => _.set(r, 'actions', [PREVIEW,DOWNLOAD]));
        console.log('附件-----------');
        console.log(this.auditMaterials);

      }else {
        console.log("fail");
      }
    }).catch(err => { this.showError('获取借款信息失败！' ) });
  }

  //查询申请信息（意向）
  public getLoanApply(loanApplyId: string) {
    this.service.getLoanApply(loanApplyId).then((res) => {
      if("0" == res.code) {
        this.loan = res.data.loanBase;
        console.log('借款信息-----------');
        console.log(this.loan);
        switch (this.method) {
          case `loan_preview`:
            if(this.loan.applyStatus==5){
              this.projectProgres=[
                {text:"补填资料"},
                {text:"意向终止"},
              ];
              this.currentNode=2;
            }else{
              this.currentNode=this.loan.applyStatus;
            }

            break;
          case `loan-first-audit`:
            this.currentNode=2;
            break;
          case `loan-second-audit`:
            this.currentNode=3;
            break;
          default:
            break;
        }
        this.pawnRelation = res.data.pawnRelation;
        this.pawnVehicle = [res.data.pawnVehicle];
        this.pawnHouse = [res.data.pawnHouse];
        this.auditMaterials = res.data.auditMaterials||[];

      }else {
        console.log("fail");
      }
    }).catch(err => { this.showError('获取申请信息失败！' ) });
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

  //对应报告类型
  forCreditList(){
    for (let index = 0; index < this.creditInfo.length; index++) {
      if(this.creditInfo[index]!==null && this.creditInfo[index].creditType!==null&&this.creditInfo[index].creditType!==undefined){
        if(this.creditInfo[index].creditType==1){
          this.creditInfo[index].creditType = "个人风险报告"
        }else if (this.creditInfo[index].creditType==2){
          this.creditInfo[index].creditType = "个人信用报告"
        }else if (this.creditInfo[index].creditType==3){
          this.creditInfo[index].creditType = "个人反欺诈报告"
        }
      }
      if(this.creditInfo[index] === null){
        this.creditInfo.splice(index, 1);
        index--;
      }
    }
  }

  //征信预览/下载
  openLink($event){
    switch($event.type){
      case `download`:
        // window.open(this.creditInfo[$event.key].creditReport);
        let a = document.createElement('a');
        let event = new MouseEvent('click');
        a.download = this.creditInfo[$event.key].creditType || '征信报告';
        a.href = this.creditInfo[$event.key].creditReport;
        a.target = "_blank";
        a.dispatchEvent(event);
        break;
      case`preview`:
        window.open(this.creditInfo[$event.key].creditReport);
        break;
      default:
        break
    }

  }
  //附件预览/下载
  openMaterials($event){
    switch($event.type){
      case `download`:
        // window.open(this.auditMaterials[$event.key].fileName);
        let a = document.createElement('a');
        let event = new MouseEvent('click');
        a.download = '文件.jpg';
        a.href = this.auditMaterials[$event.key].fileName;
        a.dispatchEvent(event);
        break;
      case`preview`:
        window.open(this.auditMaterials[$event.key].fileName);
        break;
      default:

        break
    }

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
        this.auditProcessRecords = res.data;
      }else {
        this.showError(res.message)
      }
    }).catch(err => { this.showError('获取审批记录失败！' ) });
  }

  //查询申请信息
  public getLoanAuditRecords(loanApplyId: string) {
    this.service.getLoanAuditRecords(loanApplyId).then((res) => {
      if("0" == res.code) {
        this.auditProcessRecords = res.data;
      }else {
        this.showError(res.message)
      }
    }).catch(err => { this.showError('获取审批记录失败！' ) });
  }

  //提交审核
  public auditResult: string = "pass";
  public auditOpinion: string = "";
  public auditReason: string = "";
  public submitAudit(){
    this._dialogService.confirm('是否确认提交审核?', [{type: 1, text: '确认',}, {type: 0, text: '取消',},]).subscribe(action => {
      if (action === 1) {
        this.isLoading = true;
        let param = {
          "auditResult": this.auditResult,
          "opinion": this.auditReason + " " + this.auditOpinion
        };
        if(this.method==`loan-first-audit` || this.method==`loan-second-audit`){
          this.service.loanApplyAudit(this.loan.loanApplyId, param).then(res =>{
            if(0 == res.code) {
              this.showSuccess(res.message);
              this.handleBackBtnClick();
            }else {
              this.showError(res.message);
            }
            this.isLoading = false;
          }).catch(error => {
            this.isLoading = false;
            this.showError('操作失败')
          });
        }else{
          this.service.projectAudit(this.id, param).then(res =>{
            if(0 == res.code) {
              this.showSuccess(res.message);
              this.handleBackBtnClick();
            }else {
              this.showError(res.message);
            }
            this.isLoading = false;
          }).catch(error => {
            this.isLoading = false;
            this.showError('操作失败')
          });
        }

      }
    })
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
