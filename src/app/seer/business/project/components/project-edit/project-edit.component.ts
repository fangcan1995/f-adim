import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import {ProjectService} from "../../project.service"
import { DOWNLOAD, PREVIEW } from '../../../../common/seer-table/seer-table.actions';
import { SeerMessageService } from '../../../../../theme/services/seer-message.service';
@Component({
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  /*actionSet = {
    'DOWNLOAD': {
      'type': 'download',
      'name': '下载',
      'className': 'btn btn-xs btn-info',
      icon: 'fa fa-check'
    },
    'DETAIL':{
      type: 'detail',
      name: '浏览',
      className: 'btn btn-xs btn-default',
      icon: 'fa fa-edit'
    }
  };*/
  isPawnVehicleShow: boolean = true;
  isPawnHouseShow: boolean = true;
  isCreditInfoShow: boolean = true;
  isAttachmentShow: boolean = true;
  isadRepayShow: boolean = true;
  isadRepayCheck: boolean = false;


  public project: any = {};
  public _editType: string = 'edit';
  public forbidSaveBtn: boolean = true;
  titlesPawnVehicle= [
    { key:'clpp', label:'车辆品牌' },
    { key:'clxh', label:'车辆型号' },
    { key:'cjh', label:'车架号' },
    { key:'cph', label:'车牌号'},
    { key:'djzh', label:'登记证号' },
    { key:'cl', label:'车龄' },
    { key:'xslc', label:'行驶里程' },
    { key:'pgjg', label:'评估价格' },
  ];
  titlesPawnHouse= [
    { key:'fcdz', label:'房产地址' },
    { key:'jzmj', label:'建筑面积' },
    { key:'aaa', label:'房屋类型' },
    { key:'aaa', label:'房龄'},
    { key:'aaa', label:'尚欠贷余额' },
    { key:'aaa', label:'土地所有证号' },
    { key:'aaa', label:'房屋产权所有证号' },
    { key:'aaa', label:'评估价格' },
  ];
  titlesCreditInfo=[
    { key:'aaa', label:'信用报告' },
    { key:'bbb', label:'查询状态' },
    { key:'ccc', label:'查询日期' },
  ];
  titlesAttachment=[
    { key:'aaa', label:'附件名称' },
    { key:'bbb', label:'上传时间' },
  ];
  titlesInvestInfo=[
    { key:'aaa', label:'投资人用户名' },
    { key:'bbb', label:'投资人姓名' },
    { key:'ccc', label:'投资人手机号码' },
    { key:'ddd', label:'投资金额（元）' },
    { key:'eee', label:'投资时间' },
    { key:'fff', label:'投资方式' },
  ];
  titlesRepayInfo=[
    { key:'aaa', label:'期数' },
    { key:'bbb', label:'应还日期' },
    { key:'ccc', label:'实还日期' },
    { key:'ddd', label:'已还本金（元）' },
    { key:'eee', label:'已还利息（元）' },
    { key:'fff', label:'已还罚息（元）' },
    { key:'ggg', label:'已还总额（元）' },
    { key:'hhh', label:'还款状态' },
  ];
  titlesApprovalInfo=[
    { key:'aaa', label:'审批流程' },
    { key:'bbb', label:'审批时间' },
    { key:'ccc', label:'操作人员' },
    { key:'ddd', label:'审批结果' },
  ];
  pawnVehicle: any = [];
  pawnHouse: any = [];
  creditInfo:any=[];
  attachment:any=[];
  investInfo:any=[];
  repayInfo:any=[];
  approvalInfo:any=[];
  constructor(
    private projectService: ProjectService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _messageService: SeerMessageService
  ) {}
  ngOnInit() {
    this._route.url.mergeMap(url => {
      this._editType = url[0].path
      return this._route.params
    })
      .subscribe(params => {
        console.log(this._editType);
        //
        this.projectService.getOne(params.projectId)
          .subscribe(res => {
            //console.log(res.data);
            this.project = res.data || {};
            this.pawnVehicle=this.project.pawnVehicle;  //抵押物-车
            this.pawnHouse=this.project.pawnHouse;   //房
            this.creditInfo=this.project.creditInfo //征信
            this.attachment=this.project.attachment //附件
            //this.answers=res.data.answers || [];
            //let actions;
            //actions = [this.actionSet.DETAIL,this.actionSet.CHECK];
            this.creditInfo = _.map(this.creditInfo, r => _.set(r, 'actions', [PREVIEW,DOWNLOAD]));
            this.attachment = _.map(this.attachment, r => _.set(r, 'actions', [DOWNLOAD]));
            this.investInfo=this.project.investInfo;
            this.repayInfo=this.project.repayInfo;
            this.approvalInfo=this.project.approvalInfo;
            // this.forbidSaveBtn = false;
          }, errMsg => {
            // 错误处理的正确打开方式
            alert('error');
          })
        //
        if ( this._editType === 'edit' ) {

          if(this.pawnVehicle.length<1){
            this.isPawnVehicleShow=false;
          };
          if(this.pawnHouse.length<1){
            this.isPawnHouseShow=false;
          };
          /*if(this.project.adRepay){
            this.isadRepayShow=false;
          }*/
          if(JSON.stringify(this.project.adRepay) == "{}"){
            this.isadRepayShow=false;
          };
        } else if ( this._editType === 'check' ) {
          this.forbidSaveBtn = false;
          this.isPawnVehicleShow=false;
          this.isPawnHouseShow=false;
          this.isCreditInfoShow=false;
          this.isAttachmentShow=false;
          this.isadRepayCheck=true;

          //this.forbidSaveBtn = false;
        }
      })
  }
  /*

  */
  handleBackBtnClick() {
    this._location.back()
  }

  //个人征信绑定事件
  handleCreditInfo($event){
    console.log($event);
    let { type, key } = $event;
    switch ( type ) {
      case 'download':
        alert('下载');
        break;
      case 'preview':
        alert('预览');
        break;
      default:
        break;
    }
  }
  //附件绑定事件
  handleAttachment($event){
    let { type, key } = $event;
    switch ( type ) {
      case 'download':
        alert('预览');
        break;
      default:
        break;
    }
  }

  //提交审核
  handleSaveBtnClick($event){
    if ( this.forbidSaveBtn ) return;
    this.forbidSaveBtn = true;
    if(!this.project.projectId){
      this.projectService.postOne(this.project.projectId).then((data) => {
        if(data.code=='0') {
          this.alertSuccess("添加成功");
        }else{
          this.alertError("添加失败");
        }
      });
    }

  };
  //成功提示
  alertSuccess(info:string){
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: info,
      autoHideDuration: 3000,
    }).onClose().subscribe(() => {
      this._router.navigate(['/business/project/'])
    });
  };
  //失败提示
  alertError(errMsg:string){
    this.forbidSaveBtn = false;
    // 错误处理的正确打开方式
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: errMsg,
      autoHideDuration: 3000,
    })
  };
}
