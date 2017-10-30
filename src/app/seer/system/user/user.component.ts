import { Component } from "@angular/core";
@Component({
  templateUrl: './user.component.html',
  styleUrls: [ './user.component.scss' ],
})
export class UserComponent {
  hasGlobalFilter:boolean = true;
  filters:any = [
    {
      key: 'foo',
      label: '更新人',
      type: 'input.text',
    },
    {
      key: 'bar',
      label: '账号状态',
      type: 'select',
      isDict: true,
      category: 'USER_STATUS',
    },
    {
      key: 'baz',
      label: '最后登录时间',
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
      key: 'qux',
      label: '更新时间',
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
  ];
  titles = [
    {
      key:'delFlag',
      label:'有效状态',
      isDict: true,
      category: 'DICT_DEL_FLAG'
    },
  ];
  users = [];
  handleFiltersChanged(params) {
    console.log(params)
  }
}
