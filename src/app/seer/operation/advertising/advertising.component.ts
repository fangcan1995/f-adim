import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import {SeerDialogService} from "../../../theme/services/seer-dialog.service";
import {AdvertisingService} from "./advertising.service";
import {UPDATE,DELETE} from "../../common/seer-table/seer-table.actions";
export const TO_USE = {
  type: 'to_use',
  name: '启用',
  icon: 'icon-edit',
  className: 'btn btn-xs btn-default',
};
@Component({
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.scss'],
})
export class AdvertisingComponent implements OnInit, OnDestroy {

  hasGlobalFilter = true;
  filters = [
    {
      key: 'adType', label: '广告类型', type: 'select',
      options: [
        {content: '请选择'},
        {value: '0', content: 'banner'},
        {value: '1', content: '分享邀请'}
      ]
    },
    {
      key: 'putEnv', label: '投放端', type: 'select',
      options: [
        {content: '请选择'},
        {value: '0', content: 'PC端'},
        {value: '1', content: '移动端'},
        {value: '1', content: '全平台'}
      ]
    },
    {key: 'effectTime', label: '添加时间', type: 'input.text'},
    {key: 'expiryTime', label: '一　　　', type: 'input.text'}
  ];

  ads = [];
  titles = [
    {key: 'title', label: '广告标题'},
    {key: 'adType', label: '广告类型'},
    {key: 'putEnv', label: '投放端'},
    {key: 'imgLink', label: '广告图片',type:'html'},
    {key: 'url', label: '广告链接',type:'html'},
    {key: 'createTime', label: '添加时间'},
    {key: 'state', label: '状态'}
  ];

  pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    "sort": "id",
    "total": "",
    "query": {
      "globalSearch": "",
      "category": "",
      "categoryName": "",
    },
  };

  constructor(private _advertisingService: AdvertisingService, private _dialogService: SeerDialogService,
              private _router: Router, private _activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this._advertisingService.getList(this.pageInfo)
      .subscribe(res => {
        //console.log(res);
        this.pageInfo.pageNum = res.data.pageNum;  //当前页
        this.pageInfo.pageSize = res.data.pageSize; //每页记录数
        this.pageInfo.total = res.data.total; //记录总数
        //this.ads = res.data.list;
        this.ads=res.data;
      })

    this.ads = _.map(this.ads, t => {
      return _.set(t, 'actions', [TO_USE, UPDATE, DELETE]);
    })
  }

  onChange(message) {
    //console.log(message)
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
              this._advertisingService.deleteOne(message.data.id)
                .subscribe(res => {
                  this.getList();
                });
            }
          });
        break;
      case 'delete_all':
        let ids = _(data).map(t => t.id).value();
        break;
    }
  }
  //
  // handleFiltersChanged($event) {
  //   let params = {
  //     ...$event,
  //   }
  //   this.getList(params)
  // }
  //
  // handleSearchBtnClicked($event) {
  //   let params = {
  //     ...$event,
  //   }
  //   this.getList(params)
  // }

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }

}

