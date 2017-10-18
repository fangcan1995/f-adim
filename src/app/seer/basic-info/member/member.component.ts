import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
import {SeerDialogService} from '../../../theme/services/seer-dialog.service';
import {MemberService} from './member.service';

@Component({
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit, OnDestroy {

  hasGlobalFilter = true;
  filters = [
    {key: 'name', label: '用户名', type: 'input.text'},
    {key: 'real_name', label: '真实姓名', type: 'input.text'},
    {
      key: 'gender', label: '性别', type: 'select',
      options: [
        {content: '请选择'},
        {value: '0', content: '男'},
        {value: '1', content: '女'}
      ],
      disabled: true
    },
    {key: 'mobile', label: '手机号', type: 'input.text'},
    {key: 'date', label: '日期控件', type: 'datepicker'},
  ];
  members = [];
  titles = [
    {key: 'name', label: '用户名', hidden: false},
    {key: 'real_name', label: '真实姓名', hidden: false},
    {key: 'mobile', label: '手机号', hidden: false},
    {key: 'id_number', label: '身份证号', hidden: false},
    {key: 'id_number', label: '性别', hidden: false},
    {key: 'id_number', label: '注册时间', hidden: false},
    {key: 'id_number', label: '会员状态', hidden: false},
    {key: 'id_number', label: '最后登录时间', hidden: false},
    {key: 'id_number', label: '最后登录IP', hidden: false},
    {key: 'id_number', label: '邀请人', hidden: false},
    {key: 'id_number', label: '登录次数', hidden: false},
  ];
  actionSet = {
    'update': {
      'type': 'update',
      'name': '编辑',
      'className': 'btn btn-xs btn-info',
      'icon': 'icon-edit',
    }
  };
  customActions = [
    {
      type: 'user_statistics',
      name: '用户统计',
      className: 'btn btn-xs btn-default',
    }
  ];
  paginationRules = 1;
  rowsOnPageSet = [10, 15, 30];
  rowsOnPage = 10;
  pageNum = 1;
  pageSize = 10;
  queryParams = {};
  total = 0;

  constructor(private _memberService: MemberService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _dialogService: SeerDialogService,) {
  }

  ngOnInit(): void {
    let params = {
      pageSize: this.pageSize,
      pageNum: this.pageNum,
    };
    this.getList(params);
  }

  getList(params?) {
    this._memberService.getList(params)
      .subscribe(res => {
        this.members = res.data;
        this.members = _.map(this.members, t => {
          let status = t.someStatus;
          let actions;
          switch (status) {
            case "1":
              actions = [this.actionSet.update];
              break;
            case "3":
              actions = [this.actionSet.update];
              break;
            default:
              break;
          }
          return _.set(t, 'actions', actions)
        });
        this.total = this.members.length;
      })
  }

  onChange(message) {
    const type = message.type;
    let data = message.data;
    switch (type) {
      case 'update':
        this._router.navigate(['add'], {relativeTo: this._route});
        break;
      case 'user_statistics':
        this._router.navigate([`edit/${data.id}`], {relativeTo: this._route});
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if (action === 1) {
              this._memberService.deleteOne(message.data.id)
                .subscribe(data => {
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

  ngOnDestroy(): void {
    console.log('member component destroied')
  }

  handleFiltersChanged($event) {
    this.queryParams = $event;
    let params = {
      ...this.queryParams,
      pageSize: this.pageSize,
      PageNum: this.pageNum,
    };
    this.getList(params)
  }

  handleSearchBtnClicked($event) {
    this.queryParams = $event;
    let params = {
      ...this.queryParams,
      pageSize: this.pageSize,
      PageNum: this.pageNum,
    };
    this.getList(params)
  }

  onPageChange($event) {
    this.pageSize = $event.pageSize;
    this.pageNum = $event.pageNum;
    let params = {
      ...this.queryParams,
      pageSize: this.pageSize,
      PageNum: this.pageNum,
    };
    this.getList(params)
  }
}
