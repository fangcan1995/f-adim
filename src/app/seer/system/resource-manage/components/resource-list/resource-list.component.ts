import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {ResourceManageService} from "../../resource-manage.service";
import {Router} from "@angular/router";
import {GlobalState} from "../../../../../global.state";
import * as _ from 'lodash';
import {SeerDialogService} from "../../../../../theme/services/seer-dialog.service"
import {UPDATE, DELETE} from "../../../../common/seer-table/seer-table.actions"
import { UserService } from '../../../../../theme/services/user.service';
@Component({
  selector: 'resource-list',
  templateUrl: './resource-list.component.html',
  providers: [ResourceManageService],
  styleUrls: ['./resource-list.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ResourceListComponent implements OnInit{
  title = '资源列表';
  hasGlobalFilter = false;  //是否打开高级检索
  filters = [];  //过滤条件
  pageInfo={
    "pageNum":1,
    "pageSize":10,
    "sort":"id",
    "total":"",
    "query":{},
  }; //分页、排序、检索
  data = []; //数据
  titles = [
    
    {
      key:'menuPid',
      label:'菜单父编号'
    },
    {
      key:'menuName',
      label:'菜单名'
    },
    {
      key:'menuType',
      label:'菜单类型',
      /*isDict:true*/
    },
    {
      key:'menuDesc',
      label:'菜单说明',
    },
    {
      key:'sortNum',
      label:'菜单顺序',
    },
    {
      key:'menuStatus',
      label:'有效状态',
    }
  ]; //列表中显示的字段

  constructor(
    protected service: ResourceManageService,
    private _router: Router,
    private _state:GlobalState,
    private _dialogService: SeerDialogService,
    private _userService: UserService,
    ) {
      this.getAllDate();
  }
  ngOnInit() {
    this.getAllDate();
  }
  getAllDate() {
    this.service.getResources(this.pageInfo).then((data) => {
      console.log(data);
      this.pageInfo.pageNum=data.data.pageNum;  //当前页
      this.pageInfo.pageSize=data.data.pageSize; //每页记录数
      this.pageInfo.total=data.data.total; //记录总数
      this.data = data.data.list;         //记录列表
      this.data = _.map(this.data, r => _.set(r, 'actions', [ UPDATE, DELETE ]));
    });
  };
  /*更新*/
  onChange(message):void {
    const type = message.type;
    let data = message.data;
    switch ( type ) {
      case 'create':
        this._router.navigate(['/system/resource-manage/edit']);
        break;
      case 'update':
        this._router.navigate(['/system/resource-manage/edit',message.data.menuId]);
        break;
      case 'delete':
        this._dialogService.confirm('确定删除吗？')
          .subscribe(action => {
            if ( action === 1 ) {
              this.service.deleteResource(message.data.menuId).then((data) => {
                if ( data.code=='0' ){
                  this.getAllDate();
                  this.refreshMenu();
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
  // 更新左侧导航菜单
  refreshMenu() {
    this._userService.getResourcesFromServer({ pageSize: 10000 })
    .then(res => {
      const resources = res.data ? res.data.list || [] : [];
      this._userService.setResourcesToLocal(resources);
      this._state.notify('menu.changed', resources);
    })
  }
  handlePageChange($event) {
    this.pageInfo.pageSize = $event.pageSize;
    this.pageInfo.pageNum=$event.pageNum;
    this.getAllDate();
  }//分页
/*  handleSearchBtnClicked($event) {


    this.queryParams = $event;
    let params = {
      ...this.queryParams,
      pageSize: this.pageSize,
      PageNum: this.pageNum,
    };
    this.getList(params)
  }*/


}
