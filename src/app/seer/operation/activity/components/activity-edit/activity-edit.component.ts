import {Component, OnInit,TemplateRef,ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {ActivityService} from "../../activity.service";
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService} from 'ngx-bootstrap/modal';
import {SeerDialogService, SeerMessageService,} from '../../../../../theme/services';
import {formatDate} from "ngx-bootstrap/bs-moment/format";
@Component({
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent {
  _editType: string = 'add';
  forbidSaveBtn: boolean = true;
  isInvestMode:boolean = true;

  awardCurr: any = {};//当然编辑的奖品
  awardCurrIndex=-1; //当然编辑的奖品索引
  awardCurrReadOnly:boolean=false;  //当前奖励是否只读
  isAddaward=true;  //是否可以新增奖励

  activity: any = {};  //一个活动的全部信息
  activitySubmit: any = {};  //被提交的活动的全部信息
  baseInfoDTO: any = {};  //活动基本信息
  awardsDTO: any = {};  //活动奖励信息
  scopesDTO= []; //活动范围




  memberScopes=[];  //会员信息列表
  hideChooseMembers:boolean=true;
  hidePagination=false;//会员信息列表是否分页
  scopesPageInfo={
    "pageNum":1,
    "pageSize":10,
    "total":'',
  };//会员信息列表分页信息
  membersTitles = [
    {key: 'userName', label: '用户名'},
    {key: 'trueName', label: '真实姓名'},
    {key: 'phoneNumber', label: '手机号'},
    {key: 'idNumber', label: '身份证号'},
  ];

  //选择用户模态框相关
  modalClass={"class":"modal-lg"};
  modalUsers=[];
  modalActionSet = {
    'SEARCH': {
      'type': 'search',
      'name': '查询',
      'className': 'btn btn-xs btn-info',
      icon: 'fa fa-check'
    },
    'OK': {
      'type': 'ok',
      'name': '确定',
      'className': 'btn btn-xs btn-info',
      icon: 'fa fa-check'
    },
    'All': {
      'type': 'all',
      'name': '全选',
      'className': 'btn btn-xs btn-info',
      icon: 'fa fa-check'
    }
  };
  modalhasGlobalFilter = false;
  modalfilters =[];
  formGroupColNum='col-sm-12 col-md-6 col-lg-6';
  modalTitles=[
    {key: 'userName', label: '用户名'},
    {key: 'trueName', label: '真实姓名'},
    {key: 'phoneNumber', label: '手机号'},
    {key: 'idNumber', label: '身份证号'},
  ];
  modalPageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"",
    "total":"",
    "memberType":"",
    "department":"",
    "mageMix":"",
    "mageMax":"",
    "sex":"",
    "investOrNot":"",
    "investDateBefore":"",
    "investDateAfter":"",
    "investAllMix":"",
    "investAllMax":"",
    "investOneMix":"",
    "investOneMax":"",
    "inviteMembersMix":"",
    "inviteMembersMax":"",
  }; //分页、排序、检索
  selectedUserId=[]; //选中的用户id,
  ids='';//选中的用户id
  chooseResult:string='选择用户';  //选择人员按钮中文提示
  public modalRef: BsModalRef;
  cardActions2 = [this.modalActionSet.All,this.modalActionSet.OK];

  constructor(private _activityService: ActivityService,
              private _messageService: SeerMessageService,
              private _dialogService: SeerDialogService,
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
        if (this._editType === 'edit') {
          this._activityService.getOne(params.id)
            .then(res => {
              this.activity = res.data || {};
              console.log('请求的数据');
              console.log(res.data);
              this.baseInfoDTO=this.activity.baseInfoDTO;
              (this.baseInfoDTO.trigMode=='4')?this.isInvestMode=false:this.isInvestMode=true; //投资奖励的特殊处理
              (this.baseInfoDTO.activityScope=='3')?this.hideChooseMembers=false:this.hideChooseMembers=true; //指定用户的特殊处理
              this.baseInfoDTO.beginTime=new Date(this.baseInfoDTO.beginTime);  //格式化时间
              this.baseInfoDTO.endTime=new Date(this.baseInfoDTO.endTime);  //格式化时间

              this.baseInfoDTO.participateNum1=this.baseInfoDTO.participateNum?(this.baseInfoDTO.participateNum).split("/")[0]:'';//频率字段拆分出次数
              this.baseInfoDTO.participateNum1=this.baseInfoDTO.participateNum?(this.baseInfoDTO.participateNum).split("/")[1]:'';//频率字段拆分出时间间隔
              if(this.baseInfoDTO.trigMode){
                this.isAddaward=false;
              }
              //console.log(this.baseInfoDTO);
              this.awardsDTO=this.activity.awardsDTO;

              this.scopesPageInfo.total=this.activity.scopesDTO.length;

              this.scopesDTO=this.activity.scopesDTO;  //范围列表
              this.getMembersList(this.scopesDTO.slice(0,this.scopesPageInfo.pageSize)); //读活动范围中对应的第一页会员信息
              this.forbidSaveBtn = false;
            })
            /*.catch(err => {
              this.showError(err.msg || '获取失败');
            });*/

        } else if (this._editType === 'add') {
          this.forbidSaveBtn = false;
          this.activity={
            "baseInfoDTO":{},
            "awardsDTO":{
              "redEnvelopesDTOs":[],
              "rateCouponsDTOs":[],
              "physicalRewardsDTOs":[],
              "raffleTicketsDTOs":[],
            },
            "scopesDTO":[],
          }
          this.baseInfoDTO= this.activity.baseInfoDTO;
          this.awardsDTO=this.activity.awardsDTO;
          this.scopesDTO=this.activity.scopesDTO;

        }
      })

  }

  /*基本信息相关********************************/
 //选择触发方式，选中4（投资奖励时，显示附加信息）
  chooseTrigMode(params?){
    params!='undefined'?this.isAddaward=false:this.isAddaward=true;
    if(params=='4'){
      this.isInvestMode=false;
    }else {
      this.isInvestMode=true;
    }
  }

  /*奖励模态框相关*********************************/
  //1 打开奖励模态框
  openAwardsModal(type,template: TemplateRef<any>,index,readonly) {
    this.modalRef = this.modalService.show(template);
    if(index >=0){
      this.awardCurrReadOnly=readonly;
      this.awardCurr=_.cloneDeep(this.awardsDTO[type][index]);//克隆当前奖励,防止同步更新
      this.awardCurrIndex=index;
    }else{
      this.awardCurr={};
      this.awardCurrIndex=-1;
    }
  }
  //2 增改奖励
  saveAward(type,award,redType?){
    if(this.awardCurrIndex===-1){
      //新增
      award.awardSentSum='0';

      switch (type){
        case 'redEnvelopesDTOs':
          if(redType==='1') {
            award.awardTitle = '现金红包';
          }else if(redType==='2') {
            award.awardTitle = '返现红包';
          }
          award.awardType='1';
          award.reType=redType;
          break;
        case 'rateCouponsDTOs':
          award.awardType='2';
          award.awardTitle = '加息券';
          break;
        case 'raffleTicketsDTOs':
          award.awardType='3';
          award.awardTitle = '抽奖券';
          break;
        case 'physicalRewardsDTOs':
          award.awardType='4';
          award.awardTitle = '实物礼品';
          break;
      }
      //插入数据
      this.awardsDTO[type].unshift(award);

    }else{
      //修改数据
      this.awardsDTO[type][this.awardCurrIndex]= award;
    }
    this.modalRef.hide();
  }
  //3 删除奖励
  delAward(type,index){
    this.awardsDTO[type].splice(index,1);
  }
  //4 奖品名称自动生成-红包
  redEnvelopeNameChange(type){
    if(this.awardCurr.reAmount!=''){
      this.awardCurr.reName=this.awardCurr.reAmount+'元'+type;
    }else{
      this.awardCurr.reName='';
    }
  }
  //5 奖品名称自动生成-加息券
  rateCouponNameChange(){
    let tempName1,tempName2;
    if(this.awardCurr.rcAmount!=''){
      tempName1=this.awardCurr.rcAmount+'%加息券';
    }else{
      tempName1='';
    }
    if(this.awardCurr.rcLength!=''&&this.awardCurr.rcLength){
      tempName2=this.awardCurr.rcLength+'天';
    }else{
      tempName2='';
    }
    this.awardCurr.rcName=tempName2+tempName1;
  }


  /*选择会员相关********************************/
  //获取会员id被包含在ids数组中的会员信息列表
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
  //已选会员列表翻页
  membersPageChange($event){
    if($event){
      this.scopesPageInfo.pageSize = $event.pageSize;
      this.scopesPageInfo.pageNum=$event.pageNum;
      //this.scopes=this.activity.scopes.slice((this.scopesPageInfo.pageNum-1)*this.scopesPageInfo.pageSize,this.scopesPageInfo.pageNum*this.scopesPageInfo.pageSize);
      this.getMembersList(this.scopesDTO.slice((this.scopesPageInfo.pageNum-1)*this.scopesPageInfo.pageSize,this.scopesPageInfo.pageNum*this.scopesPageInfo.pageSize));
    }
  }
  // 清空用户
  clearScopes(){
    this.memberScopes=[];
    this.scopesDTO=[];
    this.activity.scopesDTO=[];
    this.scopesPageInfo.total='0';
  }
  showChooseMembers(activityScope){
    if(activityScope=='3'){
      this.hideChooseMembers=false;
    }else{
      this.hideChooseMembers=true;
    }
  }
  //模态框相关
  //1 打开会员模态框
  openMemberModal(template: TemplateRef<any>) {
      this.modalfilters=[
        {
          key: 'memberType',
          label: '用户身份',
          type: 'select',
          options:[{value:'', content: '全部'},{value:'1', content: '注册理财师'},{value:'2', content: '财富合伙人'}]
        },
        {
          key: 'department',
          label: '区域',
          type: 'select',
          options:[{value:'', content: '全部'},{value:'1', content: '龙区'},{value:'2', content: '辽区'}]
        },
        {
          key: 'investOrNot',
          label: '投资状态',
          type: 'select',
          options:[{value:'', content: '全部'},{value:'0', content: '未投资'},{value:'1', content: '已投资'}]
        },
        {
          key: 'sex',
          label: '性别',
          type: 'select',
          options:[{value:'', content: '全部'},{value:'1', content: '男'},{value:'2', content: '女'}]
        },
        {
          key: 'mage',
          label: '年龄',
          groups: [
            {
              type: 'input.text',
            },
            {
              type: 'input.text',
            },
          ],
          groupSpaces: ['至']
        },
        {
          key: 'investDate',
          label: '投资时间',
          groups: [
            {
              type: 'datepicker',
            },
            {
              type: 'datepicker',
            },
          ],
          groupSpaces: ['至']
        },
        {
          key: 'investAll',
          label: '累计投资',
          groups: [
            {
              type: 'input.text',
            },
            {
              type: 'input.text',
            },
          ],
          groupSpaces: ['至']
        },
        {
          key: 'investOne',
          label: '单笔投资',
          groups: [
            {
              type: 'input.text',
            },
            {
              type: 'input.text',
            },
          ],
          groupSpaces: ['至']
        },
        {
          key: 'inviteMembers',
          label: '邀请人数',
          groups: [
            {
              type: 'input.text',
            },
            {
              type: 'input.text',
            },
          ],
          groupSpaces: ['至']
        }
      ];
      this.modalRef = this.modalService.show(template,this.modalClass);
      this.modalGetMembersList();
      this.selectedUserId=_.cloneDeep(this.scopesDTO);   //防止没确定前更新数据

  }
  //2 获取会员列表
  modalGetMembersList():void{
    this._activityService.getMembers(this.modalPageInfo).then(res => {
      this.modalPageInfo.pageNum=res.data.pageNum;  //当前页
      this.modalPageInfo.pageSize=res.data.pageSize; //每页记录数
      this.modalPageInfo.total=res.data.total; //记录总数
      this.modalUsers = res.data.list;
      //渲染已经被选择的会员
      this.modalUsers = _.map(this.modalUsers, r =>{
          let idIndex=this.scopesDTO.findIndex(x => x == r.memberId);
          if(idIndex!=-1){
            return _.set(r, 'selected', 1)
          }else{
            return _.set(r, 'selected', 0)
          }
        }
      );
    });
  }
  //3 会员模态框事件绑定
  modalChangeCard(message){
    switch ( message.type ) {
      case 'search':
        //过滤会员列表
        break;
      case 'ok':
        //1 将选中的会员id加入参加范围数组中
        this.scopesDTO=this.selectedUserId;

        this.activity.scopesDTO=this.scopesDTO;
        //2 重新新获取会员信息
        this.hidePagination=false;
        this.getMembersList(this.scopesDTO.slice(0,this.scopesPageInfo.pageSize)); //重新读活动范围中对应的第一页会员信息
        this.scopesPageInfo.total=this.scopesDTO.length.toString();

        this.modalService.hide(1);
        break;
      case 'all':
        //1 将后台返回会员id加入参加范围数组中
        this._activityService.getIds(this.modalPageInfo).then(data=>{
          this.scopesDTO=data.data.sparticipateNumit(",")||[];  //转成数组
          this.activity.scopesDTO=this.scopesDTO;
        }).catch(err=>{
          this.showError(err.msg || '连接错误');
        });
        //2 重新新获取会员信息
        this.hidePagination=false;
        this.getMembersList(this.scopesDTO.slice(0,this.scopesPageInfo.pageSize)); //重新读活动范围中对应的第一页会员信息
        this.modalService.hide(1);
        break;
      default:
        break;
    }
  }
  //4 会员模态框选择用户id
  modalChangeTable(message){
    const type = message.type;
    let data = message.data;
    let keyId='memberId';
    switch (type){
      case 'select_one':
        //选中追加到数组中，否则从数组中删除
        let idIndex=this.selectedUserId.findIndex(x => x == data[keyId]);
        if(data.selected){
          if(idIndex<0){
            this.selectedUserId.push(data[keyId]);
          }
        }else{
          this.selectedUserId.splice(idIndex,1);
        }

        break;
      case 'select_all':
        //遍历数组，选中追加到数组中，反选从数组中删除，这里只针对当前页
        data.map(r=> {
          let idIndex=this.selectedUserId.findIndex(x => x == r[keyId]);
          if(r.selected){
            //如果这条记录被选中，将id添加到已选数组中
            if(idIndex<0){
              this.selectedUserId.push(r[keyId]);
            }
          }else{
            //如果这条选中的记录被反选，将id从已选数组中删除
            this.selectedUserId.splice(idIndex,1);
          }
        })

        break;
      default:
        break;
    }
  }
  //5 会员模态框分页事件
  modalPageChange($event){
    this.modalPageInfo.pageSize = $event.pageSize;
    this.modalPageInfo.pageNum=$event.pageNum;
    this.modalGetMembersList();
  }
  //6 格式化查询参数
  modalFiltersChanged($event){
    let params=$event;
    let { mage,investDate,investAll,investOne,inviteMembers,...otherParams } = params;
    let mageMix,mageMax,
      investDateBefore, investDateAfter,
      investAllMix,investAllMax,
      investOneMix,investOneMax,
      inviteMembersMix,inviteMembersMax;
    if ( _.isArray(mage)) {
      mageMix = mage[0] || null;
      mageMax = mage[1] || null;
    }
    if ( _.isArray(investDate)) {
      investDateBefore = investDate[0] ? (formatDate(investDate[0],'YYYY-MM-DD 00:00:00')) : null;
      investDateAfter = investDate[1] ? (formatDate(investDate[1],'YYYY-MM-DD 23:59:59')) : null;
    }
    if ( _.isArray(investAll)) {
      investAllMix = investAll[0] || null;
      investAllMax = investAll[1] || null;
    }
    if ( _.isArray(investOne)) {
      investOneMix = investOne[0] || null;
      investOneMax = investOne[1] || null;
    }
    if ( _.isArray(inviteMembers)) {
      inviteMembersMix = inviteMembers[0] || null;
      inviteMembersMax = inviteMembers[1] || null;
    }
    params = {
      ...otherParams,
      mageMix,
      mageMax,
      investDateBefore,
      investDateAfter,
      investAllMix,
      investAllMax,
      investOneMix,
      investOneMax,
      inviteMembersMix,
      inviteMembersMax,
    }
    this.modalPageInfo = params;
    this.modalGetMembersList();
  }

  /************公共********************/
  //返回
  handleBackBtnClick() {
    this._location.back()
  }
  //保存
  handleSaveBtnClick() {
    if ( this.forbidSaveBtn ) return;
    this.forbidSaveBtn = true;
    let baseInfo=_.cloneDeep(this.activity.baseInfoDTO);
    //如果不是投资奖励，删除相关属性
    if(baseInfo.trigMode!='4'){
      delete baseInfo.productCategory;
      delete baseInfo.investLimit;
      delete baseInfo.investMinMoney;
      delete baseInfo.investMaxMoney;
      delete baseInfo.investMinNum;
      delete baseInfo.investMaxNum;
    }
    //投资范围如果不是指定用户，清空数组
    if(baseInfo.activityScope!='3'){
      this.activity.scopesDTO=[];
    }
    //拼接参加频率
    baseInfo.participateNum=baseInfo.participateNum1+'/'+baseInfo.participateNum2;
    delete baseInfo.participateNum1;
    delete baseInfo.participateNum2;
    //处理日期
    baseInfo.beginTime=(baseInfo.beginTime.getTime())|| null;
    baseInfo.endTime=(baseInfo.endTime.getTime())|| null;

    this.activitySubmit={
      "activityId":this.activity.activityId,
      "baseInfoPOJO":baseInfo,
      "awardsPOJO":{
        "redEnvelopesPOJOs":this.activity.awardsDTO.redEnvelopesDTOs,
        "rateCouponsPOJOs":this.activity.awardsDTO.rateCouponsDTOs,
        "physicalRewardsPOJOs":this.activity.awardsDTO.physicalRewardsDTOs,
        "raffleTicketsPOJOs":this.activity.awardsDTO.raffleTicketsDTOs,
      },
      "scopesDTO":this.activity.scopesDTO.join(',')
    }

    if (this._editType === 'edit') {
      console.log('编辑的数据');
      console.log(this.activitySubmit);

      this._activityService.putOne(this.activity.id, this.activitySubmit)
        .then(res=>{
          this.forbidSaveBtn = false;
          this.showSuccess(res.msg || '更新成功')
            .onClose()
            .subscribe(() => {
              this._router.navigate(['/operation/activity']);
            });
        })
        .catch(err => {
        this.forbidSaveBtn = false;
        this.showError(err.msg || '更新失败')
      });
    } else if (this._editType === 'add') {
      console.log('添加的数据');
      this.activitySubmit.activityId=null;
      console.log(this.activitySubmit);
      this._activityService.postOne(this.activitySubmit)
        .then((data:any) => {
          this.forbidSaveBtn = false;
          this.showSuccess(data.msg || '保存成功')
            .onClose()
            .subscribe(() => {
              this._router.navigate(['/operation/activity']);
            });
        }).catch(err => {
          this.forbidSaveBtn = false;
          this.showError(err.msg || '保存失败')
        });
    } else {
      return;
    }

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
