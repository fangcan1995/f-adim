import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
import {RiskEvalService} from './risk-eval.service';
import {SeerDialogService} from '../../../theme/services/seer-dialog.service';
import {PREVIEW,UPDATE, DELETE} from '../../common/seer-table/seer-table.actions';
import {SeerMessageService} from "../../../theme/services/seer-message.service";

@Component({
  templateUrl: './risk-eval.component.html',
  styleUrls: ['./risk-eval.component.scss'],
})
export class RiskEvalComponent implements OnInit {

  hasGlobalFilter = false;
  public forbidSaveBtn: boolean = true;
  /*filters = [
    {key: 'examName', label: '测评题目', type: 'input.text'}
  ];*/
  riskEvals = [];
  titles = [
    {key: 'examName', label: '测评题目'},
    {key: 'examType', label: '题目类型', isDict: true, category: 'EXAM_TYPE'},
    {key: 'createTime', label: '添加时间', type: 'date-time'}
  ];

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
      "empState": "",
      "entryTimeStart": "",
      "entryTimeEnd": ""
    }
  }; //分页、排序、检索
  errorMessage;

  constructor(private riskEvalService: RiskEvalService,
              private _messageService: SeerMessageService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _dialogService: SeerDialogService,) {
  }

  ngOnInit() {
    this.getRiskEvals();

  }

  /*获取列表*/
  getRiskEvals(): void {
    this.riskEvalService.getLists(this.pageInfo).then(res => {
      this.pageInfo.pageNum = res.data.pageNum;  //当前页
      this.pageInfo.pageSize = res.data.pageSize; //每页记录数
      this.pageInfo.total = res.data.total; //记录总数
      this.riskEvals = res.data.list;
      this.riskEvals = _.map(this.riskEvals, r => _.set(r, 'actions', [PREVIEW ]));
    }, error => this.errorMessage = <any>error);
  }

  /*更新*/
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
      case 'preview':
        this._router.navigate([`detail/${data.id}`], {relativeTo: this._route});
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？').subscribe(action => {
          if (action === 1) {
            this.riskEvalService.deleteOne(message.data.id).then(data => {
              if (data.code == '0') {
                this.alertSuccess(data.message);
                this.getRiskEvals();
              } else {
                this.alertError(data.message);
              }
            });
          }
        });
        break;
    }
  }

  //分页
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum = $event.pageNum;
    this.getRiskEvals();
  }

  //多条件查询
  handleFiltersChanged($event) {
    let params = $event;
    this.pageInfo.query = params;
    this.getRiskEvals();
  }

  alertSuccess(info: string) {
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: info,
      autoHideDuration: 3000,
    }).onClose().subscribe(() => {
      this._router.navigate(['/security/risk-eval/'])
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

