import {Component, ViewEncapsulation} from "@angular/core";
import {UserManageService} from "../../user-manage.service";
import {User} from "../../../../model/auth/user";
import {Router, ActivatedRoute, Params} from "@angular/router";
@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserManageService],
  styleUrls: ['./user-edit.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserEditComponent{
  selectedUser:User;
  title = this.selectedUser?'修改用户':'新增用户';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private service:UserManageService){}

  // ngOnInit() {
  //   this.route.params
  //   // (+) converts string 'roleId' to a number
  //     .switchMap((params: Params) => this.service.getUserById(params['id']))
  //     .subscribe((user: User) => this.selectedUser = user);
  // }
}
