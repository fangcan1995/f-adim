import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import {SeerDialogService} from "../../../theme/services/seer-dialog.service";
import {AdvertisingService} from "./advertising.service";
import {UPDATE,DELETE,ENABLE,DISABLE} from "../../common/seer-table/seer-table.actions";

@Component({
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.scss'],
})
export class AdvertisingComponent implements OnInit {
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
    {
      key: 'effectTime',
      label: '添加时间',
      groups: [
        {
          type: 'datepicker',
        },
        {
          type: 'datepicker',
        },
      ],
      groupSpaces: ['至']
    }
  ];
  ads = [];
  titles = [
    {key: 'title', label: '广告标题'},
    {key: 'adType', label: '广告类型'},
    {key: 'putEnv', label: '投放端'},
    {key: 'imgLink', label: '广告图片',type:'html'},
    {key: 'url', label: '广告链接',type:'html'},
    {key: 'createTime', label: '添加时间',type:'date-time'}
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

  constructor(
    private _advertisingService: AdvertisingService,
    private _dialogService: SeerDialogService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this._advertisingService.getList(this.pageInfo)
      .then(res => {
        //console.log(res);
        this.pageInfo.pageNum = res.data.pageNum;  //当前页
        this.pageInfo.pageSize = res.data.pageSize; //每页记录数
        this.pageInfo.total = res.data.total; //记录总数
        this.ads = res.data.list;

        this.ads = _.map(this.ads, t => {
           if(t.state=="1"){
             return _.set(t, 'actions', [DISABLE, UPDATE, DELETE]);
          }else if(t.state=="0"){
             return _.set(t, 'actions', [ENABLE, UPDATE, DELETE]);
           }
        })
      })


  }
  //编辑
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
              this._advertisingService.deleteOne(message.data.id).then(res => {
                  this.getList();
                });
            }
          });
        break;
      case 'enable':
        this._advertisingService.putOne(message.data.id,{"id":message.data.id,"state":"1"}).then(res=>{
          this.getList();
        });
        break;
      case 'disable':
        this._advertisingService.putOne(message.data.id,{"id":message.data.id,"state":"0"}).then(res=>{
          this.getList();
        });
        break;
    }
  }
  //高级检索
  handleFiltersChanged($event) {
    let params=$event;
    let { effectTime, ...otherParams } = params;
    let effectTimeStart,
      effectTimeEnd;
    if ( _.isArray(effectTime) ) {
      effectTimeStart = effectTime[0] ? effectTime[0].getTime() : null;
      effectTimeEnd = effectTime[1] ? effectTime[1].getTime() : null;
    }
    params = {
      ...otherParams,
      effectTimeStart,
      effectTimeEnd,
    }
    this.pageInfo.query = params;
    this.getList();
  }

  /*handleSearchBtnClicked($event) {
  }*/

}

