import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
import { RiskEvalService } from './risk-eval.service';
import { SeerDialogService } from '../../../theme/services/seer-dialog.service';
import { UPDATE, DELETE } from '../../common/seer-table/seer-table.actions';
@Component({
  templateUrl: './risk-eval.component.html',
  styleUrls: ['./risk-eval.component.scss'],
})
export class RiskEvalComponent implements OnInit, OnDestroy {
  hasGlobalFilter = true;
  filters = [
    {
      key: 'examName',
      label: '测评题目',
      type: 'input.text',
    }
  ];
  title = '测评题目';
  source = [];
  data = [];
  titles = [
    {key:'examName', label:'测评题目'},
    {key:'examTypeName', label:'题目类型'},
    {key:'updateDate', label:'更新时间'},
  ];

  constructor(
    protected service: RiskEvalService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialogService: SeerDialogService,
    ) {

  }
  ngOnInit() {
    this.getList();
  }
  ngOnDestroy(): void {
    console.log('riskEval component destroied')
  }
  /*获取列表*/
  getList():void{
    this.service.getRiskEvals().subscribe(res => {
      this.source = res.data;
      this.source = _.map(res.data, r => _.set(r, 'actions', [ UPDATE, DELETE ]));
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
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if ( action === 1 ) {
              this.service.deleteOne(message.data.id)
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
}

