import {Component, OnDestroy, OnInit} from "@angular/core";
import {AnnouncementService} from "./announcement.service";
import {SeerDialogService} from "../../../theme/services/seer-dialog.service";
import {UPDATE,DELETE,ENABLE,DISABLE} from "../../common/seer-table/seer-table.actions";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "ngx-bootstrap/bs-moment/format";
import * as _ from 'lodash';

@Component({
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit, OnDestroy {

  hasGlobalFilter = true;
  filters = [
    /*{key: 'announcementType', label: '公告类型', type: 'select',
      options: [
        {content: '请选择'},
        {value: '0', content: '前端'},
        {value: '1', content: '后端'}
      ]
    },*/
    {key:'announceName', label: '公告名称', type: 'input.text'},
    {key:'announceTitle', label: '公告标题', type: 'input.text'},
    /*{key: 'issueDateBegin', label: '添加时间', type: 'input.text'},
    {key: 'issueDateEnd', label: '一　　　', type: 'input.text'},*/
    {
      key: 'effectTime',
      label: '生效时间',
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

  announcements = [];
  titles = [
    {key: 'noticeName', label: '公告名称'},
    {key: 'title', label: '公告标题'},
    /*{key: 'announcementType', label: '公告类型'},*/
    {key: 'effectTime', label: '生效时间',type:'date'},
    {key: 'updateTime', label: '最后修改时间', type:'date'},
    {key: 'updateUser', label: '最后修改人'},
  ];


  /*actionSet = {
    'update': {
      'type': 'update',
      'name': '编辑',
      'className': 'btn btn-xs btn-info',
      'icon': 'icon-edit',
      'action': 'update'
    },
    'delete': {
      'type': 'delete',
      'name': '删除',
      'className': 'btn btn-xs btn-danger',
      'icon': 'icon-delete',
      'action': 'remove'
    },
    'startUsing': {
      'type': 'startUsing',
      'name': '启用',
      'className': 'btn btn-xs btn-info',
      'icon': 'icon-blocked',
      'action': 'startUsing'
    },
    'disable': {
      'type': 'disable',
      'name': '禁用',
      'className': 'btn btn-xs btn-info',
      'icon': 'icon-checkmark',
      'action': 'disable'
    }
  };*/

  pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    "sortBy": "id",
    "total": "",
    "query": {
      "globalSearch": "",
      "category": "",
      "categoryName": "",
    },
  };

  constructor(private _announcementService: AnnouncementService, private _dialogService: SeerDialogService,
              private _router: Router, private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getList();
  }


  getList(params?) {
    this._announcementService.getList(this.pageInfo)
      .then(res => {
        this.pageInfo.pageNum = res.data.pageNum;
        this.pageInfo.pageSize = res.data.pageSize;
        this.pageInfo.total = res.data.total;
        this.announcements = res.data.list;
        this.announcements = _.map(this.announcements, t => {
          let status = t.delFlag;
          let actions;
          switch (status) {
            case 0:
              actions = [UPDATE, DELETE];
              break;
          }
          return _.set(t, 'actions', actions);
        })
      })
  }

  onChange(message) {
    console.log(message);
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
              this._announcementService.deleteOne(data.id)
                .then(data => {
                  this.getList();
                });
            }
          });

        break;
      case 'delete_multiple':
        let ids = _(data).map(t => t.id).value();
        this._dialogService.confirm('确定删除么？')
          .subscribe(action => {
            if(action === 1) {
              ids.map(id => {
                this._announcementService.deleteOne(id)
                  .then(data => {
                    this.getList();
                  })
              })
            }
          });
        break;
    }
  }

  handleFiltersChanged($event) {
    let params = $event;
    let { effectTime, ...otherParams } = params;
    let effectTimeStart,
      effectTimeEnd;
    if ( _.isArray(effectTime) ) {
      effectTimeStart = effectTime[0] ? (formatDate(effectTime[0],'YYYY-MM-DD 00:00:00')) : null;
      effectTimeEnd = effectTime[1] ? (formatDate(effectTime[0],'YYYY-MM-DD 23:59:59')) : null;
    }
    params = {
      ...otherParams,
      effectTimeStart,
      effectTimeEnd,
    }
    this.pageInfo.query = params;
    this.getList();
  }
  handleSearchBtnClicked($event) {
    let params = $event;
    let { effectTime, ...otherParams } = params;
    let effectTimeStart,
      effectTimeEnd;
    if ( _.isArray(effectTime) ) {
      effectTimeStart = effectTime[0] ? (formatDate(effectTime[0],'YYYY-MM-DD 00:00:00')) : null;
      effectTimeEnd = effectTime[1] ? (formatDate(effectTime[0],'YYYY-MM-DD 23:59:59')) : null;
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
    let params = {
      ...$event,
    }
    this.getList(params)
  }*/

  handleChangePage($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum=$event.pageNum;
    this.getList();
  }

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }

}
