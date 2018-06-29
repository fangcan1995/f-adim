import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import {ActivityService} from "./activity.service";
import {SeerDialogService, SeerMessageService,} from '../../../theme/services';
import { UPDATE, DELETE,PREVIEW } from '../../common/seer-table/seer-table.actions';
import {formatDate} from "ngx-bootstrap/bs-moment/format";

@Component({
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  hasGlobalFilter = true;
  isLoading:boolean = true;
  filters = [
    {key: 'activityCode', label: '活动编号', type: 'input.text',maxLength:'11'},
    {key: 'trigMode', label: '触发方式', type: 'select', isDict: true, category: 'TRIG_MODE'},
    {key: 'activityName', label: '活动主题', type: 'input.text',maxLength:'30'},
    {key: 'productCategory', label: '适用产品', type: 'select', isDict: true, category: 'PRODUCT_CATEGORY'}, //add
    {
      key: 'beginTime',
      label: '开始时间',
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
      key: 'endTime',
      label: '结束时间',
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
    {key: 'activityStatus', label: '活动状态', type: 'select',isDict: true, category: 'ACTIVITY_STATUS'}
  ];
  titles = [
    {key: 'activityCode', label: '活动编号',textAlign:'center'},
    {key: 'trigMode', label: '触发方式',isDict: true, category: 'TRIG_MODE',textAlign:'center'},
    {key: 'activityName', label: '活动主题'},
    {key: 'productCategory', label: '适用产品',isDict: true, category: 'PRODUCT_CATEGORY',textAlign:'center'},  //add
    {key: 'beginTime', label: '开始时间',type:'date-time',textAlign:'center'},
    {key: 'endTime', label: '结束时间',type:'date-time',textAlign:'center'}, //add
    {key: 'activityStatus', label: '活动状态',isDict: true, category: 'ACTIVITY_STATUS',textAlign:'center'}
  ];
  //分页、排序、检索
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "total":"",
    "globalSearch":"",
    "activityCode":"",
    "trigMode":"",
    "activityName":"",
    "beginStartTime":"",
    "beginEndTime":"",
    "activityStatus":"",
    "sortBy":"-beginTime,-endTime",
    "excelmaps": {
      activityCode: '活动编号',
      trigMode: '触发方式',
      activityName:'活动主题',
      productCategory: '适用产品',
      beginTime: '开始时间',
      endTime: '结束时间',
      activityStatus:'活动状态'
    }
  };
  actionSet = {
    'STOP': {
      'type': 'stop',
      'name': '提前终止',
      'className': 'btn btn-xs btn-info',
      'icon': 'icon-blocked',
    }
  };
  activities = [];

  ngOnInit() {
    this.getList();
  }
  constructor(
    private _activityService: ActivityService,
    private _dialogService: SeerDialogService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _messageService: SeerMessageService,
  ) {}
  getList() {
    this._activityService.getList(this.pageInfo).then(res => {
        this.pageInfo.pageNum=res.data.pageNum;  //当前页
        this.pageInfo.pageSize=res.data.pageSize; //每页记录数
        this.pageInfo.total=res.data.total; //记录总数
        this.activities = res.data.list;
        this.activities = _.map(this.activities, t => {
          let status = t.activityStatus;
          let actions;
          switch (status) {
            case "1":
              actions = [PREVIEW,UPDATE, DELETE];
              break;
            case "2":
              actions = [PREVIEW,this.actionSet.STOP];
              break;
            default:
              actions = [PREVIEW];
              break;
          }
          return _.set(t, 'actions', actions);
        })
        this.isLoading = false;
      })
      .catch(err=> {
        this.isLoading = false;
        this.showError(err.msg || '连接失败');
      })
  }
  onChange(message) {
    let { type, data, column} = message;
    switch (type) {
      case 'create':
        this._router.navigate(['add'], {relativeTo: this._activatedRoute});
        break;
      case 'update':
        this._router.navigate([`edit/${message.data.id}`], {relativeTo: this._activatedRoute});
        break;
      case 'preview':
        this._router.navigate([`detail/${data.id}`], {relativeTo: this._activatedRoute});
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if (action === 1) {
              this._activityService.deleteOne(message.data.id).then(res => {
                this.showSuccess(data.message || '删除成功');
                this.getList();
              }).catch(err => {
                this.showError(err.msg || '删除失败');
              });
            }
          })
        break;
      case 'stop':
        //console.log(message.data);
        this._dialogService.confirm(`确定要提前终止#${message.data.activityName}#吗？<input type="text">`)
          .subscribe(action => {
            if (action === 1) {
              let reason={
                'activityQuitReason':'提前终止'
              };
              this._activityService.stop(message.data.id,reason)
                .then(data => {
                  this.showSuccess(data.message || '设置成功');
                  this.getList();
                })
                .catch(err => {
                  this.showError(err.msg || '设置失败');
                });
            }

          })
        //this.openModal('stop');
        //this.modalService.show('<div>123</div>')
        break;
      case 'hideColumn':
        this.pageInfo.excelmaps = column;
        break;
      case 'export':
        this._activityService.exportForm(this.pageInfo)
          .then(res => {
            let blob = res.blob();
            let a = document.createElement('a');
            let url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = '活动管理' + '.xls';
            a.click();
            window.URL.revokeObjectURL(url);
          }).catch(err => {
            this.showError(err.msg);
        })
        break;
    }
  }
  //条件过滤
  handleFiltersChanged($event) {
    let params=$event;
    let { beginTime,endTime, ...otherParams } = params;
    let beginStartTime,
      beginEndTime,
      endStartTime,
      endEndTime
    ;
    if ( _.isArray(beginTime)) {
      beginStartTime = beginTime[0] ? (formatDate(beginTime[0],'YYYY-MM-DD 00:00:00')) :'';
      beginEndTime = beginTime[1] ? (formatDate(beginTime[1],'YYYY-MM-DD 23:59:59')) :'';
    }
    if ( _.isArray(endTime)) {
      endStartTime = endTime[0] ? (formatDate(endTime[0],'YYYY-MM-DD 00:00:00')) :'';
      endEndTime = endTime[1] ? (formatDate(endTime[1],'YYYY-MM-DD 23:59:59')) :'';
    }
    params = {

  ...otherParams,
      beginStartTime,
      beginEndTime,
      endStartTime,
      endEndTime,

    }
    this.pageInfo = {
      ...this.pageInfo,
      ...params
    };
    this.getList();
  }
  //换页
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum=$event.pageNum;
    this.getList();
  }
  //成功提示
  showSuccess(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-check',
      autoHideDuration: 3000,
    })
  }
  //失败提示
  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }


}

