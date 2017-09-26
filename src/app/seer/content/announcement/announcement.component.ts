import {Component, OnDestroy, OnInit} from "@angular/core";

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

  constructor() {

  }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }

}
