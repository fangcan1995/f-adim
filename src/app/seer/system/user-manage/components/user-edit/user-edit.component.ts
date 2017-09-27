import {Component, ViewEncapsulation} from "@angular/core";
import {UserManageService} from "../../user-manage.service";
import {User} from "../../../../model/auth/user";
import {Router, ActivatedRoute, Params} from "@angular/router";
import { Result } from "../../../../model/result.class"
import {Location} from '@angular/common';
import { SeerDialogService } from '../../../../../theme/services/seer-dialog.service'
@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserManageService],
  styleUrls: ['./user-edit.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserEditComponent{
  newTitle = "新增用户"
  selectedUser:User;
  title = this.selectedUser?'修改用户':'新增用户';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private service:UserManageService,
              private _dialogService: SeerDialogService,
              private location: Location){}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      // this.service.getUserById(params['params']).then((result:Result) => {
      //   console.log(result);
        
      // })
     }




    //  原有代码
    // this.route.params
    // // (+) converts string 'roleId' to a number
    //   .switchMap((params: Params) => this.service.getUserById(params['id']))
    //   .subscribe((user: User) => this.selectedUser = user);
  )}
  // =====重置密码===== 先调接口后提示
   reset():void{
    this._dialogService.alert('密码已成功修改为身份证后六位')
        .subscribe(action => {
          if ( action === 1 ) {
            // this.service.deleteOne(message.data.id)
            //   .subscribe(data => {
            //     this.getList();
            // });
          }
        })
  }
  // =====返回====
  goBack():void{
    this.location.back();
  }
}
