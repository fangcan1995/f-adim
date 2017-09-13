import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import {ActivityService} from "./activity.service";
import {SeerDialogService} from "../../../theme/services/seer-dialog.service";

@Component({
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit, OnDestroy {

  hasGlobalFilter = true;
  filters = [
    {key: 'activityTheme', label: '活动主题', type: 'input.text'},
    {
      key: 'activityType', label: '活动类型', type: 'select',
      options: [
        {content: '请选择'},
        {value: '0', content: '男'},
        {value: '1', content: '女'}
      ]
    },
    {
      key: 'activityKind', label: '活动奖励种类', type: 'select',
      options: [
        {content: '请选择'},
        {value: '0', content: '男'},
        {value: '1', content: '女'}
      ]
    },
    {key: 'activityTimeBegin', label: '活动时间', type: 'input.text'},
    {key: 'activityTimeEnd', label: '一　　　', type: 'input.text'},
    {key: 'activityDays', label: '活动天数', type: 'input.text'},
    {
      key: 'activeApplication', label: '活动适用产品', type: 'select',
      options: [
        {content: '请选择'},
        {value: '0', content: '男'},
        {value: '1', content: '女'}
      ]
    }
  ];

  activities = [];
  titles = [
    {key: 'activityTheme', label: '活动主题'},
    {key: 'activityType', label: '活动类型'},
    {key: 'activityKind', label: '活动种类'},
    {key: 'activityDays', label: '活动天数'},
    {key: 'activityStartTime', label: '活动开始时间'},
    {key: 'activityState', label: '活动状态'}
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

  constructor(private _activityService: ActivityService, private _dialogService: SeerDialogService,
              private _router: Router, private _activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(params?) {
    this._activityService.getList(params)
      .subscribe(res => {
        this.activities = res.data;
        this.activities = _.map(this.activities, t => {
          let status = t.someStatus;
          let actions;
          switch (status) {
            case "1":
              actions = [this.actionSet.update, this.actionSet.delete];
              break;
            case "2":
              actions = [this.actionSet.foreclosure];
              break;
            default:
              break;
          }
          return _.set(t, 'actions', actions);
        })
      })
  }

  onChange(message) {
    console.log(message)
    const type = message.type;
    let data = message.data;
    switch (type) {
      case 'add':
        this._router.navigate(['add'], {relativeTo: this._activatedRoute});
        break;
      case 'update':
        this._router.navigate([`edit/${message.data.id}`], {relativeTo: this._activatedRoute});
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if (action === 1) {
              this._activityService.deleteOne(message.data.id)
                .subscribe(data => {
                  this.getList();
                });
            }
          })

        break;
      case 'delete_all':
        let ids = _(data).map(t => t.id).value();
        break;
    }
  }

  handleFiltersChanged($event) {
    let params = {
      ...$event,
    }
    this.getList(params)
  }

  handleSearchBtnClicked($event) {
    let params = {
      ...$event,
    }
    this.getList(params)
  }

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }

}

