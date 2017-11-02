import { Component, ViewChild, OnInit } from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
import { RiskEvalService } from './risk-eval.service';
import { SeerDialogService } from '../../../theme/services/seer-dialog.service';
import { UPDATE, DELETE } from '../../common/seer-table/seer-table.actions';
@Component({
  templateUrl: './risk-eval.component.html',
  styleUrls: ['./risk-eval.component.scss'],
})
export class RiskEvalComponent implements OnInit{
  title = '测评题目';
  hasGlobalFilter = true;
  filters = [
    {
      key: 'examName',
      label: '测评题目',
      type: 'input.text',
    }
  ];
  source = [];
  //data = [];
  titles = [
    {key:'examName', label:'测评题目'},
    {key:'riskEvalQuestionType', label:'题目类型',isDict:true},
    {key:'updateDate', label:'添加时间',type:'date-time'},
  ];
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"",
    "total":"",
    "query":{
      "globalSearch":"",
      "examName":"",
    },

  }; //分页、排序、检索
  constructor(
    protected service: RiskEvalService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialogService: SeerDialogService,
    ) {}
  ngOnInit() {
    this.getList();
  }

  /*获取列表*/
  getList():void{
    this.service.getRiskEvals(this.pageInfo).then(res => {
      this.pageInfo.pageNum=res.data.pageNum;  //当前页
      this.pageInfo.pageSize=res.data.pageSize; //每页记录数
      this.pageInfo.total=res.data.total; //记录总数
      this.source = res.data.list;
      this.source = _.map(this.source, r => _.set(r, 'actions', [ UPDATE, DELETE ]));
    });
  }
  /*更新*/
  onChange(message):void {
    const type = message.type;
    let data = message.data;
    switch ( type ) {
      case 'create':
        this._router.navigate(['/security/risk-eval/add']);
        break;
      case 'update':
        this._router.navigate([`edit/${message.data.id}`], {relativeTo: this._route} );
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？').subscribe(action => {
            if ( action === 1 ) {
              this.service.deleteOne(message.data.id)
                .then(data => {
                  this.getList();
                })
                .catch(err=>{
                  this._dialogService.alert('删除失败');
                });
            }
          })
        break;
    }
  }
}

