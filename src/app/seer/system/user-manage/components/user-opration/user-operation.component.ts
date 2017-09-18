import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {UserManageService} from "../../user-manage.service";
@Component({
  selector: 'user-operation',
  templateUrl: './user-operation.component.html',
  providers: [UserManageService],
  styleUrls: ['./user-operation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserOperationComponent implements OnInit{
  title = '用户操作';
  constructor(private service:UserManageService){}

  ngOnInit(){
  }
}
