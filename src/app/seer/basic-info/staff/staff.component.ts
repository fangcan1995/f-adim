import {
  Component,
  ViewEncapsulation,
  OnInit,
  ViewChild,
  Renderer,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import * as _ from 'lodash';
import { Ng2Uploader } from "ng2-uploader";

import {
  IMultiSelectOption,
  IMultiSelectSettings,
  IMultiSelectTexts,
} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

import { StaffService } from "./staff.service";
import { NewStaffDto } from "./NewStaffDto";
import { SearchStaffDto } from "./SearchStaffDto";
import { STAFF_TRANSLATE } from "./staff.translate";
import { DynamicComponentLoader } from "../../../theme/directives/dynamicComponent/dynamic-component.directive";
import { OrgListComponent } from "./components/orgList/org-list.component";
import { GlobalState } from "../../../global.state";
import { stringDistance } from "codelyzer/util/utils";

@Component({
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  providers: [Ng2Uploader],
  entryComponents:[OrgListComponent]

})
export class StaffComponent {
  // 控件设置
  hasGlobalFilter = true;
  filters = [
    {
      key: 'staffDtoName',
      label: '姓名',
      type: 'input.text',
    },
    {
      key: 'staffDtoNo',
      label: '员工编号',
      type: 'input.text',
    },
    {
      key: 'orgName',
      label: '公司团队',
      type: 'select',
    },
    {
      key: 'inviteNum1',
      label: '邀请人数',
      type: 'input.text',
    },
    {
      key: 'inviteNum2',
      label: '-',
      type: 'input.text',
    },
    {
      key:'staffPosition',
      label:'职位',
      type: 'input.text',
    },
    {
      key:'staffState',
      label:'员工状态',
      type: 'select',
      options:[{value:'', content: '请选择'}]
    },
    {
      key:'staffEntryDate',
      label:'入职时间',
      type: 'input.date',
    },
    {
      key:'staffEntryDate',
      label:'入职时间',
      type: 'input.date',
    },
  ];
  titles = [
    {
      key:'staffName',
      label:'姓名',
    },
    {
      key:'staffNo',
      label:'员工编号',
    },
    {
      key:'orgName',
      label:'分公司',
    },
    {
      key:'staffTeam',
      label:'团队',
    },
    {
      key:'staffPosition',
      label:'职位',
    },
    {
      key:'staffEntryDate',
      label:'入职时间',
      type: 'date',
    },
    {
      key:'inviteNum',
      label:'邀请人数',
    },
    {
      key:'loginNum',
      label:'登录次数',
    },
    {
      key:'lastLoginTime',
      label:'最后登录时间',
    },
    {
      key:'lastLoginIP',
      label:'最后登录IP',
    }
  ];
  actionSet={
    'update': {
      'type': 'update',
      'name': '编辑',
      'className': 'btn btn-xs btn-info',
    },
    'delete': {
      'type': 'delete',
      'name': '删除',
      'className': 'btn btn-xs btn-danger',
      'icon': 'ion-close-round',
    }
  };

  // 数据
  staffs = [];
  translate = STAFF_TRANSLATE;
  imageError;
  isCognate = false;
  checkAllinput = false;
  addTitle: string;

  cognateAccount = [];
  selsectNotes = '';
  staffLevelStateDict = [];
  currentRole:any;
  staffOrgName = '';
  accountList = [];
  public defaultPicture = 'assets/img/theme/no-photo.png';
  public picture = 'assets/img/app/profile/Nasta.png';
  public uploaderOptions: any = {
    // url: 'http://website.com/upload'
  };
  canDelete:boolean = true;
  onUpload:EventEmitter<any> = new EventEmitter();
  onUploadCompleted:EventEmitter<any> = new EventEmitter();

  @ViewChild('fileUpload') protected _fileUpload:ElementRef;
  @ViewChild(DynamicComponentLoader) dynamicComponentLoader: DynamicComponentLoader;

  loadOrgList() {
    this.dynamicComponentLoader.loadComponent(OrgListComponent);
  }

  public uploadInProgress:boolean = false;
  roleData = [];
  currentStaff;

  errorMessage;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private staffManageService: StaffService,
    private renderer: Renderer,
    protected _uploader: Ng2Uploader,
    ){
  }

  ngOnInit() {
    this.getStaffs();
    this.getCurrentRoles();
    if (this._canUploadOnServer()) {
      setTimeout(() => {
        this._uploader.setOptions(this.uploaderOptions);
      });

      this._uploader._emitter.subscribe((data) => {
        this._onUpload(data);
      });
    } else {
      console.warn('Please specify url parameter to be able to upload the file on the back-end');
    }
  }

  public onFiles():void {
    let files = this._fileUpload.nativeElement.files;
    if(files[0].size<1048576){
      if(files[0].type == ("image/png")||
         files[0].type == ("image/jpeg")||
         files[0].type == ("image/jpg")||
         files[0].type == ("image/bmp")||
         files[0].type == ("image/gif")){
            this.imageError = false;
            if (files.length) {
              const file = files[0];
              this._changePicture(file);
              let reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () =>{
                this.currentStaff.file = reader.result;
              };
              if (this._canUploadOnServer()) {
                this.uploadInProgress = true;
                this._uploader.addFilesToQueue(files);
              }
            }
      }else {
        this.imageError = "请您选择格式为jpeg、jpg、bmp、gif、png的图片。";
      }
    }else{
      this.imageError = "请您选择小于1Mb的图片。";
    }
  }

  public bringFileSelector():boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  public removePicture():boolean {
    this.picture = '';
    return false;
  }

  protected _changePicture(file:File):void {
    const reader = new FileReader();
    reader.addEventListener('load', (event:Event) => {
      this.picture = (<any> event.target).result;
    }, false);
    reader.readAsDataURL(file);
  }

  protected _onUpload(data):void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onUploadCompleted(data);
    } else {
      this.onUpload.emit(data);
    }
  }

  protected _onUploadCompleted(data):void {
    this.uploadInProgress = false;
    this.onUploadCompleted.emit(data);
  }

  protected _canUploadOnServer():boolean {
    return !!this.uploaderOptions['url'];
  }

  onChangeColonne(event): void {
    console.log(event);
    if(event.length>0){
      this.selsectNotes = '*提示：请认真阅读提示！若下拉菜单中有值相同的选项选择时会同时选择，因为账号不能重复。若已选择关联账号后又修改了员工编号、手机号、邮箱、微信号的内容，之前选择的关联账号会取消，请回到此处重新选择。';
    }else{
      this.selsectNotes = '';
    }
    this.cognateAccount = event;
  }

  removeCurrentRole(){
    this.currentRole = null;
    this.roleData = [];
    this.getCurrentRoles();
    this.currentRole = {roleName:'请选择'};
    this.roleData.push(this.currentRole);
  }



  //请求service
  getStaffs(): void {
    this.staffManageService.getLists()
      .subscribe(
        res => {
          this.staffs = res.data;
          this.staffs = _.map(this.staffs, t =>{
            let actions;
            actions = [this.actionSet.update, this.actionSet.delete];
            return _.set(t, 'actions', actions);
          })
          //console.log(res.data);
        },
        error =>  this.errorMessage = <any>error);
  }

  onChange(message):void {
    let type = message.type;
    let data = message.data;
    switch ( type ) {
      case 'create':
        this._router.navigate(['add'], {relativeTo: this._route});
        break;
      case 'update':
        this._router.navigate([`edit/${data.id}`], {relativeTo: this._route});
        break;
    }
    if(message.type=='delete'){
      this.staffManageService.deleteOne(message.data.id)
        .subscribe(
          res => {
            this.getStaffs();
          },
          error =>  this.errorMessage = <any>error);
    }
    if(message.type=='delete_all'){
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id)
      });
      this.staffManageService.removeAllSelectedStaffs(ids)
        .subscribe(
          res => {
            this.getStaffs();
          },
          error =>  this.errorMessage = <any>error);
    }
  }

  cancel(): void{
    this.currentStaff = false;
    this.imageError = false;
    this.staffOrgName = '';
    this.picture = 'assets/img/app/profile/Nasta.png';
    this.isCognate = false;
    this.checkAllinput = false;
    this.getStaffs();
  }
  getCurrentRoles(): void{
    this.staffManageService.getCurrentRoles()
      .subscribe(
        res => {
          this.roleData = res.data;
          this.currentRole = {roleName:'请选择'};
          this.roleData.push(this.currentRole);
        },
      error => this.errorMessage = <any>error);
  }
  checkAllInput(){
    this.checkAllinput = true;
  }
  handleFiltersChanged($event) {
    let params = {
      ...$event,
    }
  }
  handleSearchBtnClicked($event) {
    let params = {
      ...$event,
    }
  }
}

