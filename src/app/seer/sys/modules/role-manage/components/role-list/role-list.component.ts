import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {RoleManageService} from "../../role-manage.service";
import {Router} from "@angular/router";
import {Role} from "../../../../../model/auth/role";
@Component({
  selector: 'role-list',
  templateUrl: './role-list.component.html',
  providers: [RoleManageService],
  encapsulation: ViewEncapsulation.None,
})
export class RoleListComponent implements OnInit{

  title = '角色列表';

  data = [];

  roles = [];

  titles = [
    {key:'roleName',label:'角色名称'},
    {key:'validState',label:'有效状态',isDict:true},
    {key:'operateTime',label:'修改时间'},
    {key:'operator',label:'修改者'},
    {key:'createTime',label:'创建时间'},
    {key:'createUser',label:'创建者'},
  ];

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    this.service.getRoles().then((data) => {
      console.log(data)
      this.data = data.data;
      this.roles = data.data;
    });
  }
  constructor(protected service: RoleManageService, private _router: Router) {
  }
  onChange(message):void {
    if(message.type=='add'){
      console.log(message.type);
      this._router.navigate(['/seer/sys/role-manage/role']);
    }

    if(message.type=='update'){
      this._router.navigate(['/seer/sys/role-manage/role',message.data.roleId]);
    }

    if(message.type=='delete'){
      this.service.deleteRole(message.data.roleId).then((data) => {
        if ( data.success ){
          this.getAllData();
        }else {
          alert("删除失败");
        }
      });
    }

    if(message.type=='delete_all') {
      let ids = [];
      message.data.map((role:Role)=>ids.push(role.roleId));

      this.service.deleteRole(ids.toString()).then((data) => {
        if ( data.success) {
          this.getAllData();
        }else {
          alert("删除失败");
        }
      });
    }
  }
}
