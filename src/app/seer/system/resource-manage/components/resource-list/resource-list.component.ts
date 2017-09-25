import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {ResourceManageService} from "../../resource-manage.service";
import {Router} from "@angular/router";
import {GlobalState} from "../../../../../global.state";
import * as _ from 'lodash';
import {SeerDialogService} from "../../../../../theme/services/seer-dialog.service"
import {UPDATE, DELETE} from "../../../../common/seer-table/seer-table.actions"
@Component({
  selector: 'resource-list',
  templateUrl: './resource-list.component.html',
  providers: [ResourceManageService],
  styleUrls: ['./resource-list.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ResourceListComponent implements OnInit{
  title = '资源列表';
  hasGlobalFilter = true;
  filters = [
    {
      key: 'resourceId',
      label: '资源编号',
      type: 'input.text',
    },
    {
      key: 'resourceName',
      label: '资源名',
      type: 'input.text',
    },
    {
      key: 'resourceParentId',
      label: '资源父编号',
      type: 'input.text',
    }
  ];
  //source: LocalDataSource = new LocalDataSource();
 // resource = [];
  data = []; //数据
  titles = [
    {
      key:'resourceId',
      label:'资源编号'
    },
    {
      key:'resourceParentId',
      label:'资源父编号'
    },
    {
      key:'resourceName',
      label:'资源名'
    }

    ,
    {
      key:'resourceContent',
      label:'资源内容'
    }
    ,
    {
      key:'resourceType',
      label:'资源类型',
      isDict:true
    }
    ,
    {
      key:'resourceSort',
      label:'资源顺序'
    }
    ,
    {
      key:'resourcePermission',
      label:'资源权限'
    }
    ,
    {
      key:'validState',
      label:'有效状态',
      isDict:true

    }
  ];
  constructor(
    protected service: ResourceManageService,private _router: Router,private _state:GlobalState,private _dialogService: SeerDialogService,) {
      this.getAllDate();
  }
  ngOnInit() {
    this.getAllDate();
  }
  getAllDate() {
    this.service.getResources().then((data) => {
      this.data = data.data;
      this.data = _.map(this.data, r => _.set(r, 'actions', [ UPDATE, DELETE ]));
    });
  }
  /*更新*/
  onChange(message):void {
    const type = message.type;
    let data = message.data;
    //console.log(type);
    switch ( type ) {
      case 'create':
        this._router.navigate(['/system/resource-manage/edit']);
        break;
      case 'update':
        this._router.navigate(['/system/resource-manage/edit',message.data.resourceId]);
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if ( action === 1 ) {
              this.service.deleteResource(message.data.resourceId).then((data) => {
                if ( data.success ){
                  this.getAllDate();
                }else {
                  alert("删除失败");
                }
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
