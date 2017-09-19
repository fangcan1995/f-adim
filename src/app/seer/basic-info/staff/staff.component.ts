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
import { Ng2Uploader } from "ng2-uploader";

import {
  IMultiSelectOption,
  IMultiSelectSettings,
  IMultiSelectTexts,
} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

import { StaffService } from "./staff.service";

import {
  hasGlobalFilter,
  filters,
  titles
} from './staff.config';

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
  hasGlobalFilter = hasGlobalFilter;
  filters = filters;
  titles = titles;

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
    this.staffManageService.getStaffs()
      .subscribe(
        res => {
          this.staffs = res.data;
        },
        error =>  this.errorMessage = <any>error);
  }

  onChange(message):void {
    let type = message.type;
    let data = message.data;
    switch ( type ) {
      case 'add':
        this._router.navigate(['add'], {relativeTo: this._route});
        break;
      case 'update':
        this._router.navigate([`edit/${data.id}`], {relativeTo: this._route});
        break;
    }
    /*if(message.type=='add'){
      this.addTitle = "新建人员";
      this.picture = 'assets/img/app/profile/Nasta.png';
      this.cognateAccount = [];
      this.selsectNotes = '';
      this.currentRole = {roleName:'请选择'};
      this.currentStaff = {
      };
    }
    if(message.type=='update'){
      this.addTitle = "修改人员";
      this.picture = message.data.staffImageUrl;
      this.cognateAccount = [];
      this.selsectNotes = '';
      this.currentStaff = message.data;
      this.staffManageService.getOrgById(this.currentStaff.staffOrgId)
        .subscribe(
          res => {
            if(res.data!=null){
              this.staffOrgName = res.data.orgName;
            }else{
              this.staffOrgName = '';
            }

          },
          error =>  this.errorMessage = <any>error);
      if(message.data.contractBeginTime){
        let d = new Date(message.data.contractBeginTime);
        message.data.contractBeginTime = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate();
      }
      if(message.data.contractEndTime){
        let d = new Date(message.data.contractEndTime);
        message.data.contractEndTime = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate();
      }
      if(message.data.staffEntryDate){
        let d = new Date(message.data.staffEntryDate);
        message.data.staffEntryDate = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate();
      }
      if(message.data.staffDimissionDate){
        let d = new Date(message.data.staffDimissionDate);
        message.data.staffDimissionDate = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate();
      }
    }*/
    if(message.type=='delete'){
      this.staffManageService.removeStaff(message.data.id)
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
    if(message.type == 'export') {
      //alert("export");
      this.downloadTemplate("staffExport");
    }

    if(message.type=='import') {
      //alert("import");
      this.importExcel();
    }
  }

  //导出模板
  downloadTemplate(keyName) {
    //alert("download");
    //console.log(this.getData());

    let param = {
      "data": "",
      "titles": this.titles,
      "keyName":keyName
    };

    //console.log(param);
    this.staffManageService.exportExcel(param).subscribe(result=>{
      //console.log(result.json().data);
      this.download(result.data);
    });
  }

  download(data) {
    var a = document.createElement('a');
    var url = data;
    var filename = 'download.xls';
    a.href = url;
    a.download = filename;
    a.click();
  }

  //导入Excel
  importExcel(){
    //alert("import");
    this.renderer.invokeElementMethod(this._excelUpload.nativeElement, 'click');
    return false;

  }
  @ViewChild('excelUpload') _excelUpload:ElementRef;

  public onExcels():void {

    let files = this._excelUpload.nativeElement.files;
    if (files && files[0]) {
      let fd = new FormData();
      fd.append('file', files[0]);
      fd.append('type','staffExport')

      // this.service.importExcel(fd).then(result => {
      //   console.log(result.json().data);
      // });
      this.staffManageService.importExcel(fd)
        .subscribe(
          res => {
            alert(res.data);
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

  checkCardId(number): boolean{
    if(number!=null){
      const reg = new RegExp('^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$');
      if(number.length==18 && number.match(reg)){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }
  }

  checkPhone(phone): boolean{
    if(phone!=null){
      const reg = new RegExp('^1[34578]\\d{9}$');
      if(phone.length==11 && phone.match(reg)){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }
  }

  checkQq(number): boolean{
    if(number!=null){
      const reg = new RegExp('^(0|[1-9][0-9]*)$');
      let int = parseInt(number);
      if(int > 10000 && 5<=number.length && number.length<=15 && number.match(reg)){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }
  }

  checkEmail(number): boolean{
    if(number!=null){
      const reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$');
      if(number.match(reg)){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }
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

