import {Component, OnDestroy, OnInit} from "@angular/core";
import {AnnouncementService} from "./announcement.service";
import {SeerDialogService} from "../../../theme/services/seer-dialog.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from 'lodash';

@Component({
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit, OnDestroy {

  hasGlobalFilter = true;
  filters = [
    {key: 'announcementType', label: '公告类型', type: 'select',
      options: [
        {content: '请选择'},
        {value: '0', content: '前端'},
        {value: '1', content: '后端'}
      ]
    },
    {key: 'issueDateBegin', label: '添加时间', type: 'input.text'},
    {key: 'issueDateEnd', label: '一　　　', type: 'input.text'}
  ];

  announcements = [];
  titles = [
    {key: 'announcementTitle', label: '公告标题'},
    {key: 'announcementType', label: '公告类型'},
    {key: 'addDate', label: '添加时间'},
    {key: 'state', label: '状态'}
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
    'startUsing': {
      'type': 'startUsing',
      'name': '启用',
      'className': 'btn btn-xs btn-info',
    },
    'disable': {
      'type': 'disable',
      'name': '禁用',
      'className': 'btn btn-xs btn-info',
    }
  };

  constructor(private _announcementService: AnnouncementService, private _dialogService: SeerDialogService,
              private _router: Router, private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getList();
  }

  getList(params?) {
    this._announcementService.getList(params)
      .subscribe(res => {
        this.announcements = res.data;
        this.announcements = _.map(this.announcements, t => {
          let status = t.someStatus;
          let actions;
          switch (status) {
            case "1":
              actions = [this.actionSet.disable, this.actionSet.update, this.actionSet.delete];
              break;
            case "2":
              actions = [this.actionSet.startUsing, this.actionSet.update, this.actionSet.delete];
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
              this._announcementService.deleteOne(message.data.id)
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
