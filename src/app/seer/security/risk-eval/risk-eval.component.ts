import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
import { RiskEvalService } from './risk-eval.service';
import { SeerDialogService } from '../../../theme/services/seer-dialog.service';
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
  actionSet={
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
    }
  };
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
    //this.actions = [this.actionSet.update, this.actionSet.delete];
    this.getList();
  }
  ngOnDestroy(): void {
    console.log('riskEval component destroied')
  }
  /*获取列表*/
  getList():void{
    //this.actions = [this.actionSet.update, this.actionSet.delete];
    this.service.getRiskEvals().subscribe(res => {
      this.source = res.data;
      this.source = _.map(this.source, t =>{
        let actions;
        actions = [this.actionSet.update, this.actionSet.delete];
        return _.set(t, 'actions', actions);
      })
      //this.source = data.data;
    });
  }
  /*更新*/
  onChange(message):void {
    const type = message.type;
    let data = message.data;
    switch ( type ) {
      case 'add':
        this._router.navigate(['/seer/security/risk-eval/add']);
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

