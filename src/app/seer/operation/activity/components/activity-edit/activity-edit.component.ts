import {Component, OnInit,TemplateRef,ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {ActivityService} from "../../activity.service";
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService} from 'ngx-bootstrap/modal';
@Component({
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent implements OnInit {

  public activity: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  isInvestMode:boolean = true;
  public source = [];
  public data = [];
  @ViewChild('simpleTable') simpleTable
  constructor(private _activityService: ActivityService,
              private _messageService: SeerMessageService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _location: Location,
              private modalService: BsModalService,) {
  }
  /*titles = [
    {key:'jpmc',label:' 奖品名称'},
    {key:'jplx',label:'类型'},
    {key:'jcsl',label:'已抽数量'},
    {key:'jpsl',label:'奖品数量'},
    {key:'djl',label:'得奖率'},
  ];*/
  //模态框相关
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
  modalTitles=[];
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
  selectedUserId=[]; //选中的用户id
  ids='';//选中的用户id
  chooseResult:string='选择用户';  //选择人员按钮中文提示
  public modalRef: BsModalRef;
  cardActions2 = [this.modalActionSet.All,this.modalActionSet.OK];


  ngOnInit() {
    this._activatedRoute.url.mergeMap(url => {
      this._editType = url[0].path;
      return this._activatedRoute.params
    })
      .subscribe(params => {
        if (this._editType === 'edit') {
          console.log(params.id);
          /*this._activityService.getOne(params.id)
            .subscribe(res => {
              this.activity = res.data || {};
              this.forbidSaveBtn = false;
              /!*this.getList();
              this.getData();*!/
            }, errMsg => {
              // 错误处理的正确打开方式
              this._messageService.open({
                icon: 'fa fa-times-circle',
                message: errMsg,
                autoHideDuration: 3000,
              }).onClose().subscribe(() => {
                this._location.back()
              })
            })*/
        } else if (this._editType === 'add') {
          console.log('新增');
          this.forbidSaveBtn = false;
        }
      })

  }
// 假数据
 getList(params?):void{
      this._activityService.getDatas()
      .then(res => {
        console.log(res.data);
        this.source = res.data;
      });
  }

  getData(params?):void{
      this._activityService.getData()
      .then(res => {
        console.log(res.data);
        this.data = res.data;
      });
  }
  handleBackBtnClick() {
    this._location.back()
  }

  handleSaveBtnClick() {
    if (this.forbidSaveBtn) return;
    this.forbidSaveBtn = true;
    let requestStream$;
    if (this._editType === 'edit') {
      requestStream$ = this._activityService.putOne(this.activity.id, this.activity)
    } else if (this._editType === 'add') {
      requestStream$ = this._activityService.postOne(this.activity)
    } else {
      return;
    }
    requestStream$
      .subscribe(res => {
        this._messageService.open({
          icon: 'fa fa-times-circle',
          message: res.msg,
          autoHideDuration: 3000,
        }).onClose().subscribe(() => {
          this._router.navigate(['/seer/basic-info/member'])
        });
      }, errMsg => {
        this.forbidSaveBtn = false;
        // 错误处理的正确打开方式
        this._messageService.open({
          icon: 'fa fa-times-circle',
          message: errMsg,
          autoHideDuration: 3000,
        })
      })
  }
  handleSimpleTableNotify($event) {
    console.log($event)
    let { type, key } = $event;
    switch ( type ) {
      case 'save':
        console.log(this.simpleTable.getFormatDataByKey(key))
        setTimeout(() => {
          this.simpleTable.save(key);
        }, 3000)
        break;
      case 'delete':
        console.log(this.simpleTable.getFormatDataByKey(key))
        setTimeout(() => {
          this.simpleTable.delete(key);
        }, 3000)
        break;
    }
  }
  handleSimpleTableCardNotify($event) {
    console.log($event)
  }
//选择触发方式
  chooseTrigMode(params?){
    console.log(params);
    if(params=='4'){
      this.isInvestMode=false;
    }else {
      this.isInvestMode=true;
    }
  }
  //选择会员会员模态框
  openMemberModal(activityScope,template: TemplateRef<any>) {
    if(activityScope=='3'){
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
      this.modalTitles=[
        {key: 'userName', label: '用户名', hidden: false},
        {key: 'trueName', label: '真实姓名', hidden: false},
        {key: 'phoneNumber', label: '手机号', hidden: false},
        {key: 'idNumber', label: '身份证号', hidden: false},
      ];
      this.modalRef = this.modalService.show(template,this.modalClass);
      //this.getUsersList();
      this.selectedUserId=[];   //清空已选择id数组
    }


  }
  //添加奖励模态框
  openAwardsModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
