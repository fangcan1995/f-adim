import { Component, ViewChild, OnInit } from "@angular/core";
import {Router,ActivatedRoute} from "@angular/router";
import * as _ from 'lodash';
import { RiskRatingService } from "./risk-rating.service";
import { SeerDialogService } from '../../../theme/services/seer-dialog.service';
import { UPDATE, DELETE } from '../../common/seer-table/seer-table.actions';
@Component({
  templateUrl: './risk-rating.component.html',
  styleUrls: ['./risk-rating.component.scss'],
  providers: [RiskRatingService],
})
export class RiskRatingComponent implements OnInit {
  hasGlobalFilter = false;
  title = '风险等级设置';
  source = [];

  titles = [
    {key:'s2id_riskLevel', label:'风险等级'},
    {key:'score', label:'对应分值'},
    {key:'investGrade1', label:'推荐投资等级'},
    {key:'investTotal', label:'投资总额上线'}
  ];
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"",
    "total":"",
    "query":{
    },

  }; //分页、排序、检索

  constructor(
    protected service: RiskRatingService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialogService: SeerDialogService,
  ) {}
  ngOnInit() {
    this.getList();
  }

  /* 获取列表*/
  getList():void{
    this.service.getLists().then(res => {
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
                .then(data => {
                  this.getList();
                }).catch(err=>{
                this._dialogService.alert('删除失败');
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


