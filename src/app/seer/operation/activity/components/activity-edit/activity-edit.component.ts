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
import {DELETE, ENABLE, PREVIEW, UPDATE} from "../../../../common/seer-table/seer-table.actions";
declare let laydate;
declare var $: any;

@Component({
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent {
  _editType: string = 'add';
  forbidSaveBtn: boolean = true;
  isInvestMode:boolean = true;
  isFieldShow:boolean = true;

  beginTime;//开始时间
  endTime; //结束时间

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
    {key: 'userName', label: '用户帐号',textAlign:'center'},
    {key: 'trueName', label: '用户姓名',textAlign:'center'},
    {key: 'phoneNumber', label: '手机号码',textAlign:'center'},
    {key: 'idNumber', label: '身份证号',textAlign:'center'},
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
    'CANCEL': {
      'type': 'cancel',
      'name': '取消',
      'className': 'btn btn-xs btn-info',
      icon: 'fa fa-remove'
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
    {key: 'userName', label: '用户帐号',textAlign:'center'},
    {key: 'trueName', label: '用户姓名',textAlign:'center'},
    {key: 'phoneNumber', label: '手机号码',textAlign:'center'},
    {key: 'idNumber', label: '身份证号',textAlign:'center'},
  ];
  modalPageInfo={
    "pageNum":1,
    "pageSize":10,
    "sortBy":"-registTime",
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

  type=`0`; //活动关联活动0，抽奖券关联活动1

  modalParents=[];//相关活动列表
  modalParentsTitles=[
    {key: 'activityCode', label: '活动编号',textAlign:'center'},
    {key: 'activityName', label: '活动主题'},
    {key: 'beginTime', label: '开始时间',textAlign:'center'},
    {key: 'endTime', label: '结束时间',textAlign:'center'},
    {key: 'activityStatus', label: '活动状态', type: 'select',isDict: true, category: 'ACTIVITY_STATUS',textAlign:'center'},
  ];
  modalParentsPageInfo={
    "pageNum":1,
    "pageSize":10,
    "sortBy":"-beginTime,-endTime",
    "total":"",
    "globalSearch":"",
  }; //分页、排序、检索

  chooseResult:string='选择用户';  //选择人员按钮中文提示
  public modalRef: BsModalRef;
  public modalParentsRef: BsModalRef;
  cardActions2 = [this.modalActionSet.All,this.modalActionSet.OK,this.modalActionSet.CANCEL,];
  @ViewChild('validationForm') validationForm;
  @ViewChild('form1') form1;
  @ViewChild('form2') form2;
  @ViewChild('form3') form3;
  @ViewChild('form4') form4;
  @ViewChild('form5') form5;

  isSelectedMember= false;
  constructor(private _activityService: ActivityService,
              private _messageService: SeerMessageService,
              private _dialogService: SeerDialogService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _location: Location,
              private modalService: BsModalService,
              private modalService2: BsModalService,
              ) {}

  ngOnInit() {
    this._activatedRoute.url.mergeMap(url => {
      this._editType = url[0].path;
      return this._activatedRoute.params
    })
      .subscribe(params => {
        if (this._editType === 'edit') {
          this.forbidSaveBtn=false;
          this._activityService.getOne(params.id)
            .then(res => {
              this.activity = res.data || {};

              this.baseInfoDTO=this.activity.baseInfoDTO;
              (this.baseInfoDTO.trigMode=='4')?this.isInvestMode=false:this.isInvestMode=true; //投资奖励的特殊处理
              (this.baseInfoDTO.activityScope=='3')?this.hideChooseMembers=false:this.hideChooseMembers=true; //指定用户的特殊处理
              //this.baseInfoDTO.beginTime=new Date(this.baseInfoDTO.beginTime);  //格式化时间
              //this.baseInfoDTO.beginTime = this.baseInfoDTO.beginTime ? new Date(this.baseInfoDTO.beginTime.replace(/-/g, "/")) : '';
              //this.baseInfoDTO.endTime = this.baseInfoDTO.endTime ? new Date(this.baseInfoDTO.endTime.replace(/-/g, "/")) : '';
              //this.baseInfoDTO.endTime=new Date(this.baseInfoDTO.endTime);  //格式化时间

              this.baseInfoDTO.participateNum1=this.baseInfoDTO.participateNum?(this.baseInfoDTO.participateNum).split("/")[0]:'';//频率字段拆分出次数
              this.baseInfoDTO.participateNum2=this.baseInfoDTO.participateNum?(this.baseInfoDTO.participateNum).split("/")[1]:'';//频率字段拆分出时间间隔
              if(this.baseInfoDTO.trigMode){
                this.isAddaward=false;
              }
              this.awardsDTO=this.activity.awardsDTO;
              //选定会员列表
              this.scopesPageInfo.total=this.activity.scopesDTO.length;
              this.scopesDTO=this.activity.scopesDTO;  //范围列表
              console.log(this.scopesDTO.slice(0,this.scopesPageInfo.pageSize));
              this.getMembersList(this.scopesDTO.slice(0,this.scopesPageInfo.pageSize)); //读活动范围中对应的第一页会员信息

            }).catch(err => {
              this.showError(err.msg || '获取失败');
            });


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
          this.baseInfoDTO.issueTime=1;//派发时间，默认实时
          this.baseInfoDTO.productCategory=0;//适用产品：通用
          this.awardsDTO=this.activity.awardsDTO;
          this.scopesDTO=this.activity.scopesDTO;
        }
        console.log('1111111111111111111');
        //渲染日期时间组件
          laydate.render({
            elem: '#beginTime',
            type: 'datetime',
            trigger: 'click',
            done: (value, date, beginTime) => {
              console.log(23456);
              this.baseInfoDTO.beginTime = value;
            }
          })

          laydate.render({
            elem: '#endTime',
            type: 'datetime',
            trigger: 'click',
            done: (value, date, endTime) => {
              console.log(23456);
              this.baseInfoDTO.endTime = value;
            }
          })
        console.log('1111111111111111111');
      })

  }

  /*基本信息相关********************************/
 //选择触发方式，选中4（投资奖励时，显示附加信息）,选中1（直接下发时，隐藏部分信息）
  chooseTrigMode(params?){
    params!='undefined'?this.isAddaward=false:this.isAddaward=true;
    if(params=='4'){
      this.isInvestMode=false;
    }else {
      this.isInvestMode=true;
    }
    if(params=='1'){
      this.isFieldShow=false;
      this.baseInfoDTO.issueTime=1;//派发时间，默认实时
    }else {
      this.isFieldShow=true;
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
      //新增
      this.awardCurrReadOnly=false;
      this.awardCurr={};
      this.awardCurr.productCategory=0;//适用产品：通用
      this.awardCurr.isStacking=2; //不可叠加
      this.awardCurr.useLimit=1//激活方式，开户激活
      this.awardCurrIndex=-1;
      this.awardCurr.awardPersents=`100`;
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
    $('body').removeClass('modal-open');
  }
  //3 删除奖励
  delAward(type,index){
    this._dialogService.confirm(`确定删除${this.awardsDTO[type][index].reName}吗？`)
      .subscribe(action => {
        if (action === 1) {
          this.awardsDTO[type].splice(index,1);
        }
      })

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
          /*this.memberScopes = _.map(this.memberScopes, t => {
            let actions = [DELETE];

          })*/
          this.memberScopes=_.map(this.memberScopes,t =>_.set(t, 'actions', [DELETE]));

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
  //编辑
  membersOnChange($event) {
    let { type, data, column} = $event;
    console.log($event);
    switch (type) {
      case 'delete':

        this._dialogService.confirm(`确定要删除${data.trueName}吗？`)
          .subscribe(action => {
            if (action === 1) {
              console.log('原来选择的用户');
              console.log(this.scopesDTO);

              let idIndex=this.scopesDTO.findIndex(x => x == data.memberId);
              this.scopesDTO.splice(idIndex,1);

              console.log('现在选择的用户');
              console.log(this.scopesDTO);
              //重新分页

              this.scopesPageInfo.total=this.scopesDTO.length.toString();
              this.getMembersList(this.scopesDTO);
            }
          });
        break;



    }
  }
  // 清空用户
  clearScopes(){
    this.memberScopes=[];
    this.scopesDTO=[];
    this.activity.scopesDTO=[];
    this.scopesPageInfo.total='0';
    this.isSelectedMember=false;
  }
  showChooseMembers(activityScope){
    if(activityScope=='3'){
      this.hideChooseMembers=false;
    }else{
      this.hideChooseMembers=true;
    }
  }


  //模态框相关
  //1-1 打开会员模态框
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
        isDict:true,category:"M_SEX"
      },
      {
        key: 'mage',
        label: '年龄',
        type: 'select',
        options:[{value:'0', content: '全部'},{value:'1', content: '25以下'},{value:'2', content: '25-30'},{value:'3', content: '31-40'},{value:'4', content: '41-50'},{value:'5', content: '50以上'}]
      },
      /*{
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
      },*/
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
      this.selectedUserId.splice(0,this.selectedUserId.length);//清空已经选中的id
      //this.selectedUserId=_.cloneDeep(this.scopesDTO);   //防止没确定前更新数据

  }
  //1-2 获取会员列表
  modalGetMembersList():void{
    this._activityService.getMembers(this.modalPageInfo).then(res => {
      this.modalPageInfo.pageNum=res.data.pageNum;  //当前页
      this.modalPageInfo.pageSize=res.data.pageSize; //每页记录数
      this.modalPageInfo.total=res.data.total; //记录总数
      this.modalUsers = res.data.list;
      //渲染已经被选择的会员
      console.log('渲染选中的会员');
      console.log(this.modalUsers);
      this.modalUsers = _.map(this.modalUsers, r =>{
          let idIndex=this.selectedUserId.findIndex(x => x == r.memberId);
          if(idIndex!=-1){
            return _.set(r, 'selected', 1)
          }else{
            return _.set(r, 'selected', 0)
          }
        }
      );
    });
  }
  //1-3 会员模态框事件绑定
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
        this.isSelectedMember=true;

        this.modalService.hide(1);
        $('body').removeClass('modal-open');
        break;
      case 'cancel':
        this.modalService.hide(1);
        $('body').removeClass('modal-open');
        break;
      case 'all':
        //1 将后台返回会员id加入参加范围数组中
        this._activityService.getIds(this.modalPageInfo).then(data=>{
          this.scopesDTO=data.data.split(",")||[];  //转成数组
          this.activity.scopesDTO=this.scopesDTO;
          //2 重新新获取会员信息
          this.hidePagination=false;
          console.log(this.scopesPageInfo.pageSize);
          this.getMembersList(this.scopesDTO.slice(0,this.scopesPageInfo.pageSize)); //重新读活动范围中对应的第一页会员信息
          this.scopesPageInfo.total=this.scopesDTO.length.toString();
          this.isSelectedMember=true;
        }).catch(err=>{
          this.showError(err.msg || '连接错误');
        });

        this.modalService.hide(1);
        $('body').removeClass('modal-open');
        break;
      default:
        break;
    }
  }
  //1-4 会员模态框选择用户id
  modalChangeTable(message){
    const type = message.type;
    let data = message.data;
    let keyId='memberId';
    switch (type){
      case 'select_one':
        //选中追加到数组中，否则从数组中删除
        console.log('选中的用户');
        console.log(this.selectedUserId);
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
  //1-5 会员模态框分页事件
  modalPageChange($event){
    this.modalPageInfo.pageSize = $event.pageSize;
    this.modalPageInfo.pageNum=$event.pageNum;
    this.modalGetMembersList();

  }
  //1-6 格式化查询参数
  modalFiltersChanged($event){
    let params=$event;
    console.log('前台接到的查询条件');
    console.log(params);
    let { mage,investDate,investAll,investOne,inviteMembers,...otherParams } = params;
    let mageMix,mageMax,
      investDateBefore, investDateAfter,
      investAllMix,investAllMax,
      investOneMix,investOneMax,
      inviteMembersMix,inviteMembersMax;
    /*if ( _.isArray(mage)) {
      mageMix = mage[0] || '';
      mageMax = mage[1] || '';
    }*/
    switch (mage) {
      case '1':
        mageMix = '0';
        mageMax = '24';
        break;
      case '2':
        mageMix = '25';
        mageMax = '30';
        break;
      case '3':
        mageMix = '31';
        mageMax = '40';
        break;
      case '4':
        mageMix = '41';
        mageMax = '50';
        break;
      case '5':
        mageMix = '50';
        mageMax = '200';
        break;
      default:
        mageMix = '';
        mageMax = '';
        break;
    }
    if ( _.isArray(investDate)) {
      investDateBefore = investDate[0] ? (formatDate(investDate[0],'YYYY-MM-DD 00:00:00')) :'';
      investDateAfter = investDate[1] ? (formatDate(investDate[1],'YYYY-MM-DD 23:59:59')) :'';
    }
    if ( _.isArray(investAll)) {
      investAllMix = investAll[0] || '';
      investAllMax = investAll[1] || '';
    }
    if ( _.isArray(investOne)) {
      investOneMix = investOne[0] || '';
      investOneMax = investOne[1] || '';
    }
    if ( _.isArray(inviteMembers)) {
      inviteMembersMix = inviteMembers[0] || '';
      inviteMembersMax = inviteMembers[1] || '';
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
    this.modalPageInfo = {
      ...this.modalPageInfo,
      ...params
    };
    console.log('发给后台的查询条件');
    console.log(this.modalPageInfo);
    this.modalGetMembersList();
  }

  //2-1 打开关联活动模态框
  openParentIdModal(template: TemplateRef<any>,type) {
    console.log('选择活动1'+template);
    this.type=type;
    //this.modalRef = this.modalService.show(template);
    this.modalParentsRef = this.modalService2.show(template,this.modalClass);
    console.log('选择活动2');
    this.modalGetParentsList();
    console.log('选择活动3');
  }
  //2-2 获取活动列表
  modalGetParentsList():void{
    this._activityService.getList(this.modalParentsPageInfo).then(res => {
      this.modalParentsPageInfo.pageNum=res.data.pageNum;  //当前页
      this.modalParentsPageInfo.pageSize=res.data.pageSize; //每页记录数
      this.modalParentsPageInfo.total=res.data.total; //记录总数
      this.modalParents = res.data.list;
      this.modalParents = _.map(this.modalParents, r =>{
        let actions;
        actions = [ENABLE];
        return _.set(r, 'actions', actions)
        }
      );
    });
  }
  //2-3 关联活动模态框事件绑定
  modalParentsChangeTable(event,type){

    switch ( event.type ) {
      case 'enable':
        // 用选中的活动id渲染关联活动
        if(type=='0'){
          this.baseInfoDTO.parentId=event.data.activityCode;
        }else if(type=='1'){
          this.awardCurr.activityId=event.data.activityCode;
        }
        this.modalParentsRef.hide();
        $('body').removeClass('modal-open');
        break;
      default:
        break;
    }
  }
  //2-4 活动模态框分页事件
  modalParentsPageChange($event){
    this.modalParentsPageInfo.pageSize = $event.pageSize;
    this.modalParentsPageInfo.pageNum=$event.pageNum;
    this.modalGetParentsList();
  }
  //2-5模糊查询
  modalParentsFiltersChanged($event){
    let params=$event;
    this.modalParentsPageInfo = params;
    this.modalGetParentsList();
  }
  //2-6清空关联活动id
  clear(){
    this.baseInfoDTO.parentId=``;
  }


  /************公共********************/
  //返回
  handleBackBtnClick() {
    if(this.validationForm.dirty||(this.form1&&this.form1.dirty)||(this.form2&&this.form2.dirty)||(this.form3&&this.form3.dirty)||(this.form4&&this.form4.dirty)||(this.form5&&this.form5.dirty)){
      this._dialogService.confirm('还未保存确认要离开吗？')
        .subscribe(action => {
          if(action === 1) {
            this._location.back();
          }
        }) ;
    }else{
      this._location.back();
    }
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
    if(baseInfo.trigMode=='1'){
      delete baseInfo.productCategory;
      delete baseInfo.investLimit;
      delete baseInfo.investMinMoney;
      delete baseInfo.investMaxMoney;
      delete baseInfo.investMinNum;
      delete baseInfo.investMaxNum;
      delete baseInfo.activityPageUrl;
      delete baseInfo.activityRemark;
      delete baseInfo.beginTime;
      delete baseInfo.endTime;
      delete baseInfo.participateNum1;
      delete baseInfo.participateNum2;
    }else{
      //拼接参加频率
      baseInfo.participateNum=baseInfo.participateNum1+'/'+baseInfo.participateNum2;
      delete baseInfo.participateNum1;
      delete baseInfo.participateNum2;
    }

    console.log('要保存的数据');
    console.log(baseInfo);

    //投资范围如果不是指定用户，清空数组
    if(baseInfo.activityScope!='3'){
      this.activity.scopesDTO=[];
    }


    //处理日期
    //baseInfo.beginTime=formatDate(baseInfo.beginTime,'YYYY-MM-DD hh:mm:ss');
    //baseInfo.endTime=formatDate(baseInfo.endTime,'YYYY-MM-DD hh:mm:ss');
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
      console.log('----------');
      console.log(this.activitySubmit);
      this._activityService.putOne(this.activity.id, this.activitySubmit)
        .then(res=>{
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
      this.activitySubmit.activityId=null;
      this._activityService.postOne(this.activitySubmit)
        .then((data:any) => {
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
