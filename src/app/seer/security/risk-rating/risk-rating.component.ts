import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
import { RiskRatingService } from "./risk-rating.service";
import { SeerDialogService } from '../../../theme/services/seer-dialog.service';
@Component({
  templateUrl: './risk-rating.component.html',
  styleUrls: ['./risk-rating.component.scss'],
  providers: [RiskRatingService],
})
export class RiskRatingComponent implements OnInit, OnDestroy {
  hasGlobalFilter = false;
  title = '风险等级设置';
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
    {key:'s2id_riskLevel', label:'风险等级'},
    {key:'score', label:'对应分值'},
    {key:'investGrade1', label:'推荐投资等级'},
    {key:'investTotal', label:'投资总额上线'}
  ];

  constructor(
    protected service: RiskRatingService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialogService: SeerDialogService,
  ) {}
  ngOnInit() {
    this.getList();
  }
  ngOnDestroy(): void {
    console.log('riskRating component destroied')
  }
  /*获取列表*/
  getList():void{
    //this.actions = [this.actionSet.update, this.actionSet.delete];
    this.service.getLists().subscribe(res => {
      this.source = res.data;
      this.source = _.map(this.source, t =>{
        let actions;
        actions = [this.actionSet.update, this.actionSet.delete];
        //console.log(_.set(t, 'actions', actions));
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
      case 'create':
        this._router.navigate(['/security/risk-rating/add']);
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


