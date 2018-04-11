import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
import {RiskRatingService} from "./risk-rating.service";
import {SeerDialogService} from '../../../theme/services/seer-dialog.service';
import {PREVIEW,UPDATE, DELETE} from '../../common/seer-table/seer-table.actions';
import {SeerMessageService} from "app/theme/services";

@Component({
  templateUrl: './risk-rating.component.html',
  styleUrls: ['./risk-rating.component.scss'],
  providers: [RiskRatingService],
})
export class RiskRatingComponent implements OnInit {

  public forbidSaveBtn: boolean = true;
  hasGlobalFilter = false;
  riskRatings = [];

  titles = [
    {key: 'name', label: '风险等级',textAlign:'center'},
    {key: 'riskScore', label: '对应分值',textAlign:'center'},
    {key: 'investGrade', label: '推荐投资等级',isDict: true, category: 'INVEST_GRADE',textAlign:'center'},
    {key: 'investTotal', label: '投资总额上线',textAlign:'center'}
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

  constructor(private riskRatingService: RiskRatingService,
              private _messageService: SeerMessageService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _dialogService: SeerDialogService,) {
  }

  ngOnInit() {
    this.getRiskRatings();
  }

  /* 获取列表*/
  getRiskRatings(): void {
    this.riskRatingService.getLists(this.pageInfo).then(res => {
      this.pageInfo.pageNum = res.data.pageNum;  //当前页
      this.pageInfo.pageSize = res.data.pageSize; //每页记录数
      this.pageInfo.total = res.data.total; //记录总数
      this.riskRatings = res.data.list;
      this.riskRatings = _.map(this.riskRatings, r => _.set(r, 'actions', [PREVIEW]));
    });
  }

  /*更新*/
  onChange(message): void {
    const type = message.type;
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
            this.riskRatingService.deleteOne(data.id).then(data => {
              if (data.code == '0') {
                this.alertSuccess(data.message);
                this.getRiskRatings();
              } else {
                this.alertError(data.message);
              }
            });
          }
        });
        break;
      case 'delete_all':
        let ids = _(data).map(t => t.id).value();
        break;
    }
  }

  //分页
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum = $event.pageNum;
    this.getRiskRatings();
  }

  alertSuccess(info: string) {
    this._messageService.open({
      icon: 'fa fa-times-circle',
      message: info,
      autoHideDuration: 3000,
    }).onClose().subscribe(() => {
      this._router.navigate(['/security/risk-rating/'])
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


