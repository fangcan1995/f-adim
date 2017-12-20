import {Component, OnInit,TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import {ActivityService} from "./activity.service";
import {SeerDialogService, SeerMessageService,} from '../../../theme/services';
import { UPDATE, DELETE,PREVIEW } from '../../common/seer-table/seer-table.actions';
import {formatDate} from "ngx-bootstrap/bs-moment/format";
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService} from 'ngx-bootstrap/modal';
@Component({
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  hasGlobalFilter = true;
  filters = [
    {key: 'activityId', label: '活动编号', type: 'input.text'},
    {key: 'trigMode', label: '触发方式', type: 'select', isDict: true, category: 'TRIG_MODE'},
    {key: 'activityTheme', label: '活动主题', type: 'input.text'},
    {
      key: 'activityTime',
      label: '活动时间',
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
    {key: 'activityId', label: '活动编号'},
    {key: 'trig_mode', label: '触发方式',isDict: true, category: 'TRIG_MODE'},
    {key: 'activityTheme', label: '活动主题'},
    {key: 'ydjps', label: '已发奖品数'},
    {key: 'jpzs', label: '奖品总数'},
    {key: 'activityStartTime', label: '活动开始时间',type:'date'},
    {key: 'activityStatus', label: '活动状态',isDict: true, category: 'ACTIVITY_STATUS'}
  ];
  //分页、排序、检索
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"-createTime",
    "total":"",
    "globalSearch":"",
    "activityId":"",
    "trig_mode":"",
    "activityTheme":"",
    "activityStartTime":"",
    "activityEndTime":"",
    "activityStatus":"",
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
  public modalRef: BsModalRef;
  constructor(
    private _activityService: ActivityService,
    private _dialogService: SeerDialogService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _messageService: SeerMessageService,
    private modalService: BsModalService,
    ) {}

  ngOnInit(): void {
    this.getList();
  }
  getList(params?) {
    this._activityService.getList(params)
      .then(res => {
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
      })
      .catch(err=> {
        this.showError(err.json().message || '连接失败');
      })
  }
  onChange(message) {
    const type = message.type;
    let data = message.data;
    switch (type) {
      case 'create':
        this._router.navigate(['add'], {relativeTo: this._activatedRoute});
        break;
      case 'update':
        this._router.navigate([`edit/${message.data.id}`], {relativeTo: this._activatedRoute});
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if (action === 1) {
              this._activityService.deleteOne(message.data.id).then(res => {
                this.showSuccess(data.message || '删除成功');
                this.getList();
              }).catch(err => {
                this.showError(err.json().message || '删除失败');
              });
            }
          })

        break;
      case 'stop':
        this._dialogService.confirm('确定提前停止吗？<input type="text">')
          .subscribe(action => {
            if (action === 1) {
              this._activityService.stop(message.data.id)
                .then(data => {
                  this.showSuccess(data.message || '设置成功');
                  this.getList();
                })
                .catch(err => {
                  this.showError(err.json().message || '设置失败');
                });
            }

          })
        //this.openModal('stop');
        //this.modalService.show('<div>123</div>')
        break;
    }
  }
  //条件过滤
  handleFiltersChanged($event) {
    let params=$event;
    let { activityTime, ...otherParams } = params;
    let activityStartTime,
      activityEndTime;
    if ( _.isArray(activityTime)) {
      activityStartTime = activityTime[0] ? (formatDate(activityTime[0],'YYYY-MM-DD 00:00:00')) : null;
      activityEndTime = activityTime[1] ? (formatDate(activityTime[1],'YYYY-MM-DD 23:59:59')) : null;
    }
    params = {
      ...otherParams,
      activityStartTime,
      activityEndTime,
    }
    //console.log(params);
    this.pageInfo = params;
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}

