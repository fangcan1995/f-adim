import {Component, OnInit,ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {ActivityService} from "../../activity.service";
import {SeerMessageService} from "../../../../../theme/services/seer-message.service";

@Component({
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.scss']
})
export class ActivityEditComponent implements OnInit {

  public activity: any = {};
  private _editType: string = 'add';
  public forbidSaveBtn: boolean = true;
  public source = [];
  public data = [];
  @ViewChild('simpleTable') simpleTable
  constructor(private _activityService: ActivityService,
              private _messageService: SeerMessageService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _location: Location) {
  }
  titles = [
    {key:'roleName',label:'红包主题'},
    {key:'validState',label:'适用产品'},
    {key:'sendTime',label:'红包金额'},
    {key:'sendway',label:'启用金额'},
    {key:'Time',label:'有效期（天）'},
    {key:'red',label:'红包叠加'},
    {key:'add',label:'加息卷叠加'},
  ];
  title = [
    {key:'roleName',label:'加息卷主题'},
    {key:'validState',label:'适用产品'},
    {key:'sendTime',label:'加息点（%）'},
    {key:'sendway',label:'启用金额'},
    {key:'Time',label:'有效期（天）'},
    {key:'Time',label:'加息期限（天）'},
    {key:'red',label:'红包叠加'},
    {key:'add',label:'加息卷叠加'},
  ];

  ngOnInit() {
    this._activatedRoute.url.mergeMap(url => {
      this._editType = url[0].path;
      return this._activatedRoute.params
    })
      .subscribe(params => {
        if (this._editType === 'edit') {
          console.log(params.id);
          this._activityService.getOne(params.id)
            .subscribe(res => {
              this.activity = res.data || {};
              this.forbidSaveBtn = false;
            }, errMsg => {
              // 错误处理的正确打开方式
              this._messageService.open({
                icon: 'fa fa-times-circle',
                message: errMsg,
                autoHideDuration: 3000,
              }).onClose().subscribe(() => {
                this._location.back()
              })
            })
        } else if (this._editType === 'add') {
          this.forbidSaveBtn = false;
        }
      })
      this.getList();
      this.getData();
  }
// 假数据
 getList(params?):void{
      this._activityService.getDatas()
      .then(res => {
        console.log(res.data);
        
        this.source = res.data;
      });
  }

  getData(params?):void{
      this._activityService.getData()
      .then(res => {
        console.log(res.data);
        
        this.data = res.data;
      });
  }
  handleBackBtnClick() {
    this._location.back()
  }

  handleSaveBtnClick() {
    if (this.forbidSaveBtn) return;
    this.forbidSaveBtn = true;
    let requestStream$;
    if (this._editType === 'edit') {
      requestStream$ = this._activityService.putOne(this.activity.id, this.activity)
    } else if (this._editType === 'add') {
      requestStream$ = this._activityService.postOne(this.activity)
    } else {
      return;
    }
    requestStream$
      .subscribe(res => {
        this._messageService.open({
          icon: 'fa fa-times-circle',
          message: res.msg,
          autoHideDuration: 3000,
        }).onClose().subscribe(() => {
          this._router.navigate(['/seer/basic-info/member'])
        });
      }, errMsg => {
        this.forbidSaveBtn = false;
        // 错误处理的正确打开方式
        this._messageService.open({
          icon: 'fa fa-times-circle',
          message: errMsg,
          autoHideDuration: 3000,
        })
      })
  }
   handleSimpleTableNotify($event) {
    console.log($event)
    let { type, key } = $event;
    switch ( type ) {
      case 'save':
        console.log(this.simpleTable.getFormatDataByKey(key))
        setTimeout(() => {
          this.simpleTable.save(key);
        }, 3000)
        break;
      case 'delete':
        console.log(this.simpleTable.getFormatDataByKey(key))
        setTimeout(() => {
          this.simpleTable.delete(key);
        }, 3000)
        break;
    }
  }
  handleSimpleTableCardNotify($event) {
    console.log($event)
  }
  // ======================选着人员页面跳转==================
  choose(){
     this._router.navigate(['operation/activity/edit']);
  }

}
