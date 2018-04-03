import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';
import {SeerDialogService, SeerMessageService,} from '../../../theme/services';
import {AdvertisingService} from "./advertising.service";
import {PREVIEW,UPDATE,DELETE,ENABLE,DISABLE} from "../../common/seer-table/seer-table.actions";
import {formatDate} from "ngx-bootstrap/bs-moment/format";
@Component({
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.scss'],
})
export class AdvertisingComponent implements OnInit {
  hasGlobalFilter = true;
  filters = [
    {
      key: 'title',
      label: '广告标题',
      type: 'input.text',
    },
    {
      key: 'adType',
      label: '广告类型',
      type: 'select',
      isDict: true,
      category: 'ADVERTISING_ADTYPE'
    },
    {
      key: 'putEnv',
      label: '投放平台',
      type: 'select',
      isDict: true,
      category: 'ADVERTISING_PUTENV'
    },
    {
      key: 'effectTime',
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
    },{
      key: 'expiryTime',
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
    {
      key: 'putStatus',
      label: '投放状态',
      type: 'select',
      isDict: true,
      category: 'ADVERTISING_PUTSTATUS'
    },

  ];
  ads = [];
  titles = [
    {key: 'title', label: '广告标题'},
    {key: 'adType', label: '广告类型',isDict:true,category:"ADVERTISING_ADTYPE"},
    {key: 'putEnv', label: '投放平台',isDict:true,category:"ADVERTISING_PUTENV"},
    {key: 'icon', label: '广告图片',type:'image'},
    {key: 'url', label: '广告链接',type:'link'},
    /*{key: 'createTime', label: '添加时间',type:'date-time'},*/
    {key: 'effectTime', label: '开始时间',type:'date-time'},
    {key: 'expiryTime', label: '结束时间',type:'date-time'},
    {key: 'putStatus', label: '投放状态',isDict:true,category:"ADVERTISING_PUTSTATUS"},

  ];
  pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    "sort": "",
    "total": "",
    "globalSearch": "",
    "adType": "",
    "putEnv": "",
    "effectTimeStart": "",
    "effectTimeEnd": "",
    "expiryTimeStart": "",
    "expiryTimeEnd": "",
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
        this.pageInfo.pageNum = res.data.pageNum;  //当前页
        this.pageInfo.pageSize = res.data.pageSize; //每页记录数
        this.pageInfo.total = res.data.total; //记录总数
        this.ads = res.data.list;
        //this.ads=_.map(this.ads,t =>_.set(t, 'actions', [DISABLE, UPDATE, DELETE]));
        this.ads = _.map(this.ads, t => {
           if(t.status==0){
             return _.set(t, 'actions', [PREVIEW,UPDATE, DELETE]);
          }else if(t.status ==1){
             return _.set(t, 'actions', [PREVIEW,UPDATE, DELETE]);
           }else{
             return _.set(t, 'actions', [PREVIEW,UPDATE, DELETE]);
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
      case 'preview':
        this._router.navigate([`detail/${message.data.id}`], {relativeTo: this._activatedRoute});
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

      /*case 'enable':
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
        break;*/

      /*case 'export':
        console.log('11111111111111111111111');
        for (let p in this.pageInfo) {
          if(this.pageInfo[p] == '' || undefined || null) {
            delete this.pageInfo[p];
          }
        }
         this._advertisingService.exportPersonalForm(this.pageInfo).then(res => {
          let blob = res.blob();
          let a = document.createElement('a');
          let url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = '广告列表' + '.xls';
          a.click();
          window.URL.revokeObjectURL(url);
          console.log(res);
        }).catch(err => {
          console.log(err);
        });

        break;*/


    }
  }
  //高级检索
  handleFiltersChanged($event) {
    let params=$event;
    let { effectTime,expiryTime,...otherParams } = params;
    let effectTimeStart,
      effectTimeEnd,
      expiryTimeStart,
      expiryTimeEnd;
    if ( _.isArray(effectTime) ) {
      effectTimeStart = effectTime[0] ? (formatDate(effectTime[0],'YYYY-MM-DD 00:00:00')) : null;
      effectTimeEnd = effectTime[1] ? (formatDate(effectTime[1],'YYYY-MM-DD 23:59:59')) : null;

    }
    if ( _.isArray(expiryTime) ) {
      expiryTimeStart = expiryTime[0] ? (formatDate(expiryTime[0],'YYYY-MM-DD 00:00:00')) : null;
      expiryTimeEnd = expiryTime[1] ? (formatDate(expiryTime[1],'YYYY-MM-DD 23:59:59')) : null;
    }
    params = {
      ...otherParams,
      effectTimeStart,
      effectTimeEnd,
      expiryTimeStart,
      expiryTimeEnd,
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

