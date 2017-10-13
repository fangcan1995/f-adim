import {Component,OnInit,TemplateRef} from '@angular/core';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import {ActivityService} from "../../activity.service";



@Component({
  templateUrl: 'activity-add.component.html',
  styleUrls: ['activity-add.component.css']
})
export class ActivityAddComponent implements OnInit {
  constructor(private ActivityService: ActivityService,private _location: Location) {}
newTitle = "选择人员"
source = []
titles = [
    {key:'roleName',label:'用户名'},
    {key:'realName',label:'真实姓名'},
    {key:'tel',label:'手机号'},
    {key:'IDcard',label:'身份证号'},
    {key:'sex',label:'性别'},
  ];
// ====================假数据=======================
    getList(params?):void{
      this.ActivityService.getDatas()
      .then(res => {
          console.log(res.data);
          
        this.source = res.data;
    });
  }
 handleBackBtnClick() {
    this._location.back()
  }
  ngOnInit() {
 
      
  }


  
  

}
