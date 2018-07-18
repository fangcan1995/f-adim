import {Component, OnInit,TemplateRef,ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {ActivityService} from "../../activity.service";
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService} from 'ngx-bootstrap/modal';
import {SeerMessageService,} from '../../../../../theme/services';
import {formatDate} from "ngx-bootstrap/bs-moment/format";

const RESEND = {
  type: 'resend',
  name: '补发',
  className: 'btn btn-xs btn-info',
  icon: 'icon-edit',
};

@Component({
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {
  _editType: string = '';

  activity: any = {};  //一个活动的全部信息
  baseInfoDTO: any = {};  //活动基本信息
  awardsDTO: any = {};  //活动奖励信息
  isInvestMode:boolean = true;
  activityCode;
  isFieldShow:boolean = true;
  awardCurr: any = {};//当前编辑的奖品
  awardCurrIndex=-1; //当前编辑的奖品索引

  records=[];  //发放记录列表
  recordsPageInfo={
    "pageNum":1,
    "pageSize":10,
    "total":'',
    "sortBy":'-createTime'
  };//会员信息列表分页信息
  recordsTitles = [
    {key: 'createTime', label: '领奖时间',textAlign:'center'},
    {key: 'userName', label: '用户名',textAlign:'center'},
    {key: 'trueName', label: '真实姓名',textAlign:'center'},
    {key: 'phoneNumber', label: '手机号',textAlign:'center'},
    {key: 'name', label: '奖品名称',textAlign:'center'},
    {key: 'acSendStatus', label: '派奖结果',isDict: true, category: 'AC_SEND_STATUS',textAlign:'center'},
  ];

  //选择用户模态框相关
  modalClass={"class":"modal-lg"};

  memberScopes=[];  //会员信息列表
  hideChooseMembers:boolean=true;
  hidePagination=false;//会员信息列表是否分页
  scopesPageInfo={
    "pageNum":1,
    "pageSize":10,
    "total":'',
  };//会员信息列表分页信息
  membersTitles = [
    {key: 'userName', label: '用户帐号',textAlign:'center'},
    {key: 'trueName', label: '用户姓名',textAlign:'center'},
    {key: 'phoneNumber', label: '手机号码',textAlign:'center'},
    {key: 'idNumber', label: '身份证号',textAlign:'center'},
  ];


  public modalRef: BsModalRef;

  constructor(private _activityService: ActivityService,
              private _messageService: SeerMessageService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _location: Location,
              private modalService: BsModalService,
  ) {}

  ngOnInit() {
    this._activatedRoute.url.mergeMap(url => {
      this._editType = url[0].path;

      return this._activatedRoute.params
    })
      .subscribe(params => {
        if (this._editType === 'detail') {
          this.activityCode=params.id;
          this._activityService.getOne(this.activityCode)
            .then(res => {
              console.log('请求的数据');
              console.log(res.data);
              this.activity = res.data || {};
              this.baseInfoDTO=this.activity.baseInfoDTO;
              //this.baseInfoDTO.trigMode='4';
              (this.baseInfoDTO.trigMode=='4')?this.isInvestMode=false:this.isInvestMode=true; //投资奖励的特殊处理
              (this.baseInfoDTO.trigMode=='1')?this.isFieldShow=false:this.isFieldShow=true; //直接下发的特殊处理

              this.baseInfoDTO.participateNum1=this.baseInfoDTO.participateNum?(this.baseInfoDTO.participateNum).split("/")[0]:'';//频率字段拆分出次数
              this.baseInfoDTO.participateNum2=this.baseInfoDTO.participateNum?(this.baseInfoDTO.participateNum).split("/")[1]:'';//频率字段拆分出时间间隔
              this.awardsDTO=this.activity.awardsDTO;//奖品列表


              /*根据活动状态获取待发放记录或已发放记录*/
              //如果活动进行中或已结束
              if(this.baseInfoDTO.activityStatus!=1){
                //获取发放记录
                this.getRecordsList();
              }else{
                //活动未开始并且指定会员
                if(this.baseInfoDTO.activityScope=='3'){
                  this.scopesPageInfo.total=this.activity.scopesDTO.length;
                  //this.scopesPageInfo.total=this.awardsDTO.length;
                  this.getMembersList(this.activity.scopesDTO.slice(0,this.scopesPageInfo.pageSize)); //读活动范围中对应的第一页会员信息
                }
              }


              //this.scopesDTO=this.activity.scopesDTO;  //范围列表


            })
            .catch(err => {
              this.showError(err.msg || '获取失败');
            });
        } else {
          this.showError('error');
        }
      })

  }

  /*奖励模态框相关*********************************/
  //1 打开奖励模态框
  openAwardsModal(type,template: TemplateRef<any>,index,readonly) {
    this.modalRef = this.modalService.show(template);
    if(index >=0){
      this.awardCurr=_.cloneDeep(this.awardsDTO[type][index]);//克隆当前奖励,防止同步更新
      this.awardCurrIndex=index;
    }else{
      this.awardCurr={};
      this.awardCurrIndex=-1;
    }
  }

  //获取发放记录
  getRecordsList(){
    this._activityService.getSendRecords(this.activityCode,this.recordsPageInfo).then(res=>{
        this.recordsPageInfo.pageNum=res.data.pageNum;  //当前页
        this.recordsPageInfo.pageSize=res.data.pageSize; //每页记录数
        this.recordsPageInfo.total=res.data.total; //记录总数
        this.records = res.data.list;
        this.records = _.map(this.records, t => {
          let status = t.sendStatus;
          let actions;
          switch (status) {
            case "2":
              actions = [RESEND];
              break;
            default:
              break;
          }
          return _.set(t, 'actions', actions);
        })

      }
    ).catch(err=>{
        this.showError(err.msg || '获取失败');
      }
    );
  }

  //发放记录翻页
  recordsPageChange($event){
    if($event){
      this.recordsPageInfo.pageSize = $event.pageSize;
      this.recordsPageInfo.pageNum=$event.pageNum;
      this.getRecordsList();
    }
  }
  //获取待发放记录
  getMembersList(ids){
    if(ids.toString()!=''){
      let params={
        "scopesDTO":ids.toString()
      };
      this._activityService.getIdsMembers(params)
        .then(res=>{
          this.memberScopes = res.data;
        }).catch(err=>{
          this.showError(err.msg || '获取失败');
        }
      );
    }
  }
  //待发放记录列表翻页
  membersPageChange($event){
    if($event){
      this.scopesPageInfo.pageSize = $event.pageSize;
      this.scopesPageInfo.pageNum=$event.pageNum;
      this.getMembersList(this.activity.scopesDTO.slice((this.scopesPageInfo.pageNum-1)*this.scopesPageInfo.pageSize,this.scopesPageInfo.pageNum*this.scopesPageInfo.pageSize));
    }
  }
  //用字典过滤数据,fieldName字段名，category字典key，obj输出到哪个对象
  /*getDicts(fieldName,category,obj): void {
    this._activityService.getDictTranslate([{"fieldName": fieldName,"category": category}]).then(res =>{
      let item=_.cloneDeep(res.data[fieldName]);
      if(res.code==0) {
         let index=item.findIndex(x => x.itemId == this[obj][fieldName]);
         if(index!=-1){
           this[obj][fieldName]=item[index].itemName;
           //console.log(this[obj][fieldName]);
         }
      }
    });
  }*/
  //补发奖励
  onChange(message) {
    const type = message.type;
    let data = message.data;
    console.log(type);
    switch (type) {
      case 'resend':
        console.log('11111111111');
        this._activityService.reSend(message.data.id)
          .then(data => {
            this.showSuccess(data.message || '补发成功');
            this.getRecordsList();
          })
          .catch(err => {
            this.showError(err.msg || '补发失败');
          });
        break;
    }
  }
  //返回
  handleBackBtnClick() {
    this._location.back()
  }
  //成功提示
  showSuccess(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-check',
      autoHideDuration: 3000,
    })
  }
  //错误提示
  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }

}
