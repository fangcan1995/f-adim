import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {ResourceManageService} from "../../resource-manage.service";
import {Router} from "@angular/router";
import {GlobalState} from "../../../../../global.state";


@Component({
  selector: 'resource-list',
  templateUrl: './resource-list.component.html',
  providers: [ResourceManageService],
  styleUrls: ['./resource-list.scss'],
  encapsulation: ViewEncapsulation.None
})


export class ResourceListComponent implements OnInit{
  title = '资源列表';
  source: LocalDataSource = new LocalDataSource();

  resource = [];
  data1 = [];
  //data:ResourceModel[];
  //
  // settings = {
  //   mode: 'inline',
  //   hideHeader: false,
  //   hideSubHeader: true,
  //   actions: {
  //     columnTitle: '操作',
  //     add: false,
  //     edit: false,
  //     delete: true
  //   },
  //   filter: {
  //     inputClass: '',
  //   },
  //
  //   add: {
  //     addButtonContent: '<i class="ion-ios-plus-outline"></i>',
  //     createButtonContent: '<i class="ion-checkmark"></i>',
  //     cancelButtonContent: '<i class="ion-close"></i>',
  //   },
  //   edit: {
  //     editButtonContent: '<i class="ion-edit"></i>',
  //     saveButtonContent: '<i class="ion-checkmark"></i>',
  //     cancelButtonContent: '<i class="ion-close"></i>',
  //   },
  //   delete: {
  //     deleteButtonContent: '<i class="ion-trash-a"></i>',
  //     confirmDelete: true
  //   },
  //   columns: {
  //     resourceId: {
  //       title: '资源编号',
  //       type: 'string'
  //     },
  //
  //     resourceParentId: {
  //       title: '资源父编号',
  //       type: 'string'
  //     },
  //
  //     resourceName: {
  //       title: '资源名',
  //       type: 'string'
  //     },
  //
  //     resourceContent: {
  //       title: '资源内容',
  //       type: 'string'
  //     }
  //     ,
  //     resourceType: {
  //       title: '资源类型',
  //       type: 'string'
  //     }
  //     ,
  //     resourceSort: {
  //       title: '资源顺序',
  //       type: 'string'
  //     }
  //     ,
  //     resourcePermission: {
  //       title: '资源权限',
  //       type: 'string'
  //     }
  //     ,
  //     validState: {
  //       title: '有效状态',
  //       type: 'string'
  //     }
  //     ,
  //     isDelete: {
  //       title: '删除标识',
  //       type: 'string'
  //     },
  //     checkbox: {
  //       title: '操作',
  //       type:'html'
  //     },
  //
  //   }
  // };
  //
  // onSearch(query: string = ''): void {
  //   this.source.setFilter([
  //     // fields we want to inclue in the search
  //     {
  //       field: 'resourceId',
  //       search: query
  //     },
  //     {
  //       field: 'resourceName',
  //       search: query
  //     }
  //     ,
  //     {
  //       field: 'resourceParentId',
  //       search: query
  //     }
  //   ], false);
  // }


  constructor(
    protected service: ResourceManageService,private _router: Router,private _state:GlobalState) {
      this.getAllDate();
  }


  ngOnInit() {
    this.getAllDate();
  }

  getAllDate() {
    this.service.getResources().then((data) => {
      this.source.load(data.data);
      this.data1 = data.data;
    });
  }

  // onEdit(event) :void {
  //     alert(event.data.resourceId);
  // }
  //
  //
  // onDeleteConfirm(event): void {
  //
  //   if (window.confirm('Are you sure you want to delete?')) {
  //
  //     this.service.deleteResource(event.data.resourceId).then((data) => {
  //
  //       console.log(data.data);
  //
  //     });
  //
  //     event.confirm.resolve();
  //
  //   } else {
  //
  //     event.confirm.reject();
  //
  //   }
  // }


  settings1 = {
    columns: {
      resourceId: {
        title: '资源编号',
        type: 'string'
      },

      resourceParentId: {
        title: '资源父编号',
        type: 'string'
      },

      resourceName: {
        title: '资源名',
        type: 'string'
      },

      resourceContent: {
        title: '资源内容',
        type: 'string'
      }
      ,
      resourceType: {
        title: '资源类型',
        type: 'string'
      }
      ,
      resourceSort: {
        title: '资源顺序',
        type: 'string'
      }
      ,
      resourcePermission: {
        title: '资源权限',
        type: 'string'
      }
      ,
      validState: {
        title: '有效状态',
        type: 'string',

      }
      ,
      isDelete: {
        title: '删除标识',
        type: 'string',
        isDict:true
      },
      checkbox: {
        title: '操作',
        type:'html'
      },

    },

    actions: {
      columnTitle: '操作',
    },
    pager:{
      perPage: 10
    }
  };

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
    // ,
    // {
    //   key:'isDelete',
    //   label:'删除标识'
    // }
    // ,
    // {
    //   key:'createTime',
    //   label:'创建时间'
    // }
  ];


  titleOption = [
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
    ,
    {
      key:'isDelete',
      label:'删除标识'
    }
    ,
    {
      key:'createTime',
      label:'创建时间'
    }
    ,
    {
      key:'createUser',
      label:'创建人'
    }
    ,
    {
      key:'operateTime',
      label:'更新时间 '
    },

    {
      key:'operator',
      label:'更新人'
    }
  ];




  onChange(message):void {

    if(message.type=='add'){
      //alert("add");
      this._router.navigate(['/seer/system/resource-manage/edit']);
    }

    if(message.type=='update'){
      // let param:DynamicComponentParam = {component: ResourceEditComponent, data: { data: message.data } };
      // this._state.notify('create.dynamic.component',param);//现在通过广播动态加载
      this._router.navigate(['/seer/system/resource-manage/edit',message.data.resourceId]);
    }

    if(message.type=='delete'){
      //alert(message.data.resourceId);
      //alert("delete");
      this.service.deleteResource(message.data.resourceId).then((data) => {
        console.log(data.data);
        //message.confirm.reverse();
        if ( data.success ){
          this.getAllDate();
        }else {
          alert("删除失败");
        }
      });
    }


    if(message.type=='delete_all') {
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.resourceId)
      });
      //alert(ids.toString());
      //alert(message.data.resourceId);


      this.service.deleteResource(ids.toString()).then((data) => {
        console.log(data.data);
        //message.confirm.reverse();
        if ( data.success) {
          this.getAllDate();
        }else {
          alert("删除失败");
        }
      });
    }
  }
}
