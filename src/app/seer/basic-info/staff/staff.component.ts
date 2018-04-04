import {Component} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
import {StaffService} from "./staff.service";
import {UPDATE, DELETE} from '../../common/seer-table/seer-table.actions';
import {SeerDialogService} from "../../../theme/services/seer-dialog.service"
import {titles} from './staff.config';
import {SeerMessageService} from "../../../theme/services/seer-message.service";
import { formatDate } from "ngx-bootstrap/bs-moment/format";

@Component({
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent {

  hasGlobalFilter = true;
  public forbidSaveBtn: boolean = true;
  OPEN_USER = [
    {type: 'open', name: '开通用户', className: 'btn btn-info'}
  ];
  filters = [
    {key: 'empName', label: '姓名', type: 'input.text'},
    {key: 'emCode', label: '员工编号', type: 'input.text'},
    {
      key: 'departmentName', label: '公司团队', type: 'input.text',
     
    },
    {key: 'inviteNumStart', label: '邀请人数', type: 'input.text'},
    {key: 'inviteNumEnd', label: '-', type: 'input.text'},
    {key: 'position', label: '职位', type: 'input.text'},
    {
      key: 'empStatus', label: '员工状态', type: 'select',
      options: [{value: '', content: '请选择'},{value: '0', content: '试用'},{value: '1', content: '在职'},{value: '2', content: '离职'}]
    },
    {key: 'entryTimeStart', label: '入职时间', type: 'input.date'},
    {key: 'entryTimeEnd', label: '至', type: 'input.date'},
  ];
  public titles = titles;
  pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    "sort": "-entryTime",
    "total": "",
    "query": {
      "globalSearch": "",
      "empName": "",
      "emCode": "",
      "departmentName": "",
      "inviteNumStart": "",
      "inviteNumEnd": "",
      "position": "",
      "empStatus": "",
      "entryTimeStart": "",
      "entryTimeEnd": ""
    },
    "Organization":[{value:'',content:''}]
  }; //分页、排序、检索
  staffs = [];// 数据
  errorMessage;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private staffManageService: StaffService,
              private _messageService: SeerMessageService,
              private _dialogService: SeerDialogService) {
  }

  ngOnInit() {
    this.getStaffs();
    this.getAllOrganizations();
  }

  //获取列表
  getStaffs(): void {
    console.log(this.pageInfo)
    this.staffManageService.getLists(this.pageInfo).then(
      res => {
        this.pageInfo.pageNum = res.data.pageNum;  //当前页
        this.pageInfo.pageSize = res.data.pageSize; //每页记录数
        this.pageInfo.total = res.data.total; //记录总数
        this.staffs = res.data.list;
        this.staffs = _.map(this.staffs, r => _.set(r, 'actions', [UPDATE, DELETE]));
      },
      error => this.errorMessage = <any>error);
  }

  //获取所有部门信息
  getAllOrganizations():void {
    this.staffManageService.getAllOrganizations().then(
      res => {
        console.log(res)
        // res.data.map((item,index)=>{
        //   this.pageInfo.Organization[index].value=item.departmentId;
        //   this.pageInfo.Organization[index].content=item.departmentName
        // })
        console.log(this.pageInfo.Organization)
        this.pageInfo.pageNum = res.data.pageNum;  //当前页
        this.pageInfo.pageSize = res.data.pageSize; //每页记录数
        this.pageInfo.total = res.data.total; //记录总数
        this.staffs = res.data.list;
        this.staffs = _.map(this.staffs, r => _.set(r, 'actions', [UPDATE, DELETE]));
      },
      error => this.errorMessage = <any>error);
  }
  //增删改
  onChange(message): void {
    let type = message.type;
    let data = message.data;
    switch (type) {
      case 'create':
        this._router.navigate(['add'], {relativeTo: this._route});
        break;
      case 'update':
        this._router.navigate([`edit/${data.id}`], {relativeTo: this._route});
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if (action === 1) {
              this.staffManageService.deleteOne(data.id).then((data) => {
                if (data.code == '0') {
                  this.alertSuccess(data.message);
                  this.getStaffs();
                } else {
                  this.alertError(data.message);
                }
              });
            }
          });
        break;
      case 'delete_all':
        let ids = [];
        message.data.forEach(function (item) {
          ids.push(item.id)
        });
      case 'open':
        this.openUsers(data);
        break;
      case 'click':
        this._router.navigate([`detail/${data.id}`], {relativeTo: this._route});
        break;
      default:
        break;
    }
  }

  //分页
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum = $event.pageNum;
    this.getStaffs();
  }

  //多条件查询
  handleFiltersChanged($event) {
    // let params = $event;
    const newData = _.cloneDeep($event);
    console.log(newData);
    newData.entryTimeEnd = newData.entryTimeEnd?newData.entryTimeEnd+' 08:00:00':''
    newData.entryTimeStart = newData.entryTimeStart?newData.entryTimeStart+' 08:00:00':''
    console.log(newData); 
    this.pageInfo.query = newData;
    this.getStaffs();
  }

  handleSearchBtnClicked($event) {
    // let params = $event;
    const newData = _.cloneDeep($event);
    console.log(newData);
    newData.entryTimeEnd = newData.entryTimeEnd?newData.entryTimeEnd+' 08:00:00':''
    newData.entryTimeStart = newData.entryTimeStart?newData.entryTimeStart+' 08:00:00':''
    console.log(newData);
    this.pageInfo.query = newData;
    this.getStaffs();
  }

  openUsers(data) {
    let staffs = [];
    data.forEach(function (item) {
      let staff = {id: item.id, name: item.phone};
      staffs.push(staff);
    });
    console.log(staffs);
  }

  alertSuccess(info: string) {
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: info,
      autoHideDuration: 3000,
    }).onClose().subscribe(() => {
      this._router.navigate(['/basic-info/staff-manage/'])
    });
  }

  alertError(errMsg: string) {
    this.forbidSaveBtn = false;
    // 错误处理的正确打开方式
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: errMsg,
      autoHideDuration: 3000,
    })
  }

}

