import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import {SeerDialogService} from "../../../theme/services/seer-dialog.service";
import {AdvertisingService} from "./advertising.service";

@Component({
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.scss'],
})
export class AdvertisingComponent implements OnInit, OnDestroy{

  hasGlobalFilter = true;
  filters = [
    {key: 'couponTheme', label: '加息劵主题', type: 'input.text'},
    {key: 'activityTheme', label: '所属活动', type: 'input.text'},
    {key: 'realName', label: '发送用户', type: 'input.text'},
    {
      key: 'state', label: '状态', type: 'select',
      options: [
        {content: '请选择'},
        {value: '0', content: '男'},
        {value: '1', content: '女'}
      ]
    },
    {key: 'issueDateBegin', label: '发放日期', type: 'input.text'},
    {key: 'issueDateEnd', label: '一　　　', type: 'input.text'}
  ];

  coupons = [];
  titles = [
    {key: 'couponTheme', label: '加息劵主题'},
    {key: 'activityTheme', label: '所属活动'},
    {key: 'realName', label: '用户真实姓名'},
    {key: 'raiseInterestRates', label: '加息点(%)'},
    {key: 'startSum', label: '起用金额(元)'},
    {key: 'issueDate', label: '发放日期'},
    {key: 'expirationDate', label: '截止日期'},
    {key: 'state', label: '状态'}
  ];

  actionSet = {
    'sendAgain': {
      'type': 'sendAgain',
      'name': '重新发送',
      'className': 'btn btn-xs btn-info',
    }
  };

  constructor(private _advertisingService: AdvertisingService, private _dialogService: SeerDialogService,
              private _router: Router, private _activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(params?) {
    this._advertisingService.getList(params)
      .subscribe(res => {
        this.coupons = res.data;
        this.coupons = _.map(this.coupons, t => {
          let status = t.someStatus;
          let actions;
          switch (status) {
            case "1":
              actions = [this.actionSet.sendAgain];
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
              this._advertisingService.deleteOne(message.data.id)
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

