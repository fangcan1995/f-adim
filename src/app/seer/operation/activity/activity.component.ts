import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as _ from 'lodash';
import {ActivityService} from "./activity.service";

@Component({
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit, OnDestroy {

  hasGlobalFilter = true;
  filters = [
    {key: 'name', label: '用户名', type: 'input.text'},
    {key: 'real_name', label: '真实姓名', type: 'input.text'},
    {
      key: 'gender', label: '性别', type: 'select',
      options: [
        {content: '请选择'},
        {value: '0', content: '男'},
        {value: '1', content: '女'}
      ]
    },
    {key: 'mobile', label: '手机号', type: 'input.text'}
  ];

  activitys = [];
  titles = [
    {key: 'activityTheme', label: '活动主题'},
    {key: 'activityType', label: '活动类型'},
    {key: 'activityKind', label: '活动种类'},
    {key: 'activityDays', label: '活动天数'},
    {key: 'activityStartTime', label: '活动开始时间'},
    {key: 'activityState', label: '活动状态'},
  ];

  actionSet = {
    'update': {
      'type': 'update',
      'name': '编辑',
      'className': 'btn btn-xs btn-info',
    },
    'delete': {
      'type': 'delete',
      'name': '删除',
      'className': 'btn btn-xs btn-danger',
      'icon': 'ion-close-round',
      'action': 'remove'
    },
    'foreclosure': {
      'type': 'foreclosure',
      'name': '提前终止',
      'className': 'btn btn-xs btn-default',
      'action': 'foreclosure'
    }
  };

  constructor(private _activityService: ActivityService, private _router: Router) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(params?) {
    this._activityService.getList(params)
      .subscribe(res => {
        this.activitys = res.data;
        this.activitys = _.map(this.activitys, t => {
          let status = t.someStatus;
          let actions;
          switch (status) {
            case "1":
              actions = [this.actionSet.update, this.actionSet.delete];
              break;
            case "2":
              actions = [this.actionSet.foreclosure, this.actionSet.delete];
              break;
            case "3":
              actions = [this.actionSet.update];
              break;
            default:
              break;
          }
          return _.set(t, 'actions', actions);
        })
      })
  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

}

