import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import {SeerDialogService, SeerMessageService,} from '../../../theme/services';
import {AdvertisingService} from "./advertising.service";
import {UPDATE,DELETE,ENABLE,DISABLE} from "../../common/seer-table/seer-table.actions";
import {formatDate} from "ngx-bootstrap/bs-moment/format";
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
      key: 'createTime',
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
    {key: 'adType', label: '广告类型',isDict:true,category:"ADVERTISING_ADTYPE"},
    {key: 'putEnv', label: '投放端',isDict:true,category:"ADVERTISING_PUTENV"},
    {key: 'icon', label: '广告图片',type:'image'},
    {key: 'url', label: '广告链接',type:'link'},
    {key: 'createTime', label: '添加时间',type:'date-time'}
  ];
  pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    "sort": "",
    "total": "",
    "globalSearch": "",
    "adType": "",
    "putEnv": "",
    "createTimeStart": "",
    "createTimeEnd": "",
  };

  constructor(
    private _advertisingService: AdvertisingService,
    private _dialogService: SeerDialogService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _messageService: SeerMessageService
    ) {
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
        //this.ads=_.map(this.ads,t =>_.set(t, 'actions', [DISABLE, UPDATE, DELETE]));
        this.ads = _.map(this.ads, t => {
           if(t.status==0){
             return _.set(t, 'actions', [DISABLE, UPDATE, DELETE]);
          }else if(t.status ==1){
             return _.set(t, 'actions', [ENABLE, UPDATE, DELETE]);
           }else{
             return _.set(t, 'actions', [UPDATE, DELETE]);
           }
        })
      }).catch(err=>{
      this.showError(err.json().message || '连接失败');
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
                this.showSuccess(data.message || '删除成功');
                  this.getList();
                }).catch(err => {
                this.showError(err.json().message || '删除失败');
              });
            }
          });
        break;
      case 'enable':
        this._advertisingService.patchOne(message.data.id,{"id":message.data.id,"status":0}).then(res=>{
          this.showSuccess(data.message || '设置成功');
          this.getList();
        }).catch(err => {
          this.showError(err.json().message || '设置失败');
        });
        break;
      case 'disable':
        this._advertisingService.patchOne(message.data.id,{"id":message.data.id,"status":1}).then(res=>{
          this.showSuccess(data.message || '设置成功');
          this.getList();
        }).catch(err => {
          this.showError(err.json().message || '设置失败');
        });
        break;
    }
  }
  //高级检索
  handleFiltersChanged($event) {
    let params=$event;
    let { createTime,...otherParams } = params;
    let createTimeStart,
      createTimeEnd;
    if ( _.isArray(createTime) ) {
      createTimeStart = createTime[0] ? (formatDate(createTime[0],'YYYY-MM-DD 00:00:00')) : null;
      createTimeEnd = createTime[1] ? (formatDate(createTime[1],'YYYY-MM-DD 23:59:59')) : null;
    }
    params = {
      ...otherParams,
      createTimeStart,
      createTimeEnd,
    }
    //console.log(params);
    this.pageInfo = params;
    this.getList();
  }
  //分页
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum=$event.pageNum;
    this.getList();
  }
  /*handleSearchBtnClicked($event) {
  }*/
  showSuccess(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-check',
      autoHideDuration: 3000,
    })
  }
  showError(message: string) {
    return this._messageService.open({
      message,
      icon: 'fa fa-times-circle',
      autoHideDuration: 3000,
    })
  }
}

