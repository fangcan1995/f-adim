import {Component, ViewEncapsulation, OnInit, ViewChild, Renderer, EventEmitter, ElementRef} from '@angular/core';
import {StaffManageService} from "../staff.service";
import {Json} from "../../../login/Json";
import {Ng2Uploader} from "ng2-uploader";
import {NewStaffDto} from "../NewStaffDto";
import {SearchStaffDto} from "../SearchStaffDto";
import {STAFF_TRANSLATE} from "./staff.translate";
import {DynamicComponentLoader} from "../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {OrgListComponent} from "./orgList/org-list.component";
import {IMultiSelectOption,IMultiSelectSettings,IMultiSelectTexts} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {GlobalState} from "../../../../global.state";
import {stringDistance} from "codelyzer/util/utils";


@Component({
  selector: 'StaffComponent',
  templateUrl: './staff.Component.html',
  styleUrls: ['./staff.component.scss','./staffhead.component.css'],
  providers: [Ng2Uploader],
  entryComponents:[OrgListComponent]

})
export class StaffComponent{
  title = '人员管理';
  translate = STAFF_TRANSLATE;
  imageError;
  isCognate = false;
  checkAllinput = false;
  addTitle: string;
  //下面两个为多个checkbox选择插件配置
  dropdownSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: false,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    autoUnselect: false,
    showCheckAll: false,
    showUncheckAll: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };
  myRepertoryTexts: IMultiSelectTexts = {
    checkAll: '选中所有',
    uncheckAll: '取消所有',
    checked: '个选中',
    checkedPlural: '个选中',
    searchPlaceholder: '搜索...',
    defaultTitle: '选择账号',
  };
  private accountData: IMultiSelectOption[] = [];
  cognateAccount = [];
  selsectNotes = '';
  staffLevelStateDict = [];
  currentRole:any;
  search = {
  staffDtoNo:'',
  staffDtoName:'',
  staffDtoCardId:'',
  };
  staffOrgName = '';
  accountList = [];
  public defaultPicture = 'assets/img/theme/no-photo.png';
  public picture = 'assets/img/app/profile/Nasta.png';
  public uploaderOptions:any = {
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
  data = [];
  roleData = [];
  json = Json;
  currentStaff;
  titles = [
    {
      key:'staffNo',
      label:'员工编号',
    },
    {
      key:'staffName',
      label:'姓名',
    },
    {
      key:'staffCardId',
      label:'身份证号',
    },
    {
      key:'staffPhone',
      label:'手机',
    },
    {
      key:'orgName',
      label:'所属组织机构',
    },
    {
      key:'contractType',
      label:'合同类型',
    },
    {
      key:'staffState',
      label:'员工状态',
    }
  ];

  titleOption =[
    {
      key:'staffNo',
      label:'员工编号',
    },
    {
      key:'staffName',
      label:'姓名',
    },
    {
      key:'staffGender',
      label:'性别',
    },
    {
      key:'staffCardId',
      label:'身份证号',
    },
    {
      key:'staffNation',
      label:'民族',
    },
    {
      key:'staffOrigin',
      label:'籍贯',
    },
    {
      key:'isMarried',
      label:'婚姻情况',
    },
    {
      key:'haveChild',
      label:'有无子女',
    },
    {
      key:'staffEducation',
      label:'学历',
    },
    {
      key:'staffSchool',
      label:'毕业院校',
    },
    {
      key:'staffPhone',
      label:'手机',
    },
    {
      key:'staffQq',
      label:'QQ号',
    },
    {
      key:'staffMail',
      label:'邮箱',
    },
    {
      key:'staffWechat',
      label:'微信号',
    },
    {
      key:'staffAdress',
      label:'家庭住址',
    },
    {
      key:'staffTel',
      label:'家庭电话',
    },
    {
      key:'staffContacts',
      label:'紧急联系人',
    },
    {
      key:'staffContactsPhone',
      label:'紧急联系人电话',
    },
    {
      key:'orgName',
      label:'所属组织机构',
    },
    {
      key:'contractType',
      label:'合同类型',
    },
    {
      key:'contractId',
      label:'合同编号',
    },
    {
      key:'contractBeginTime',
      label:'合同签订日期',
      type: 'date',
    },
    {
      key:'contractEndTime',
      label:'合同结束日期',
      type: 'date',
    },
    {
      key:'staffState',
      label:'员工状态',
    },
    {
      key:'staffLevel',
      label:'员工等级',
    },
    {
      key:'staffEntryDate',
      label:'入职时间',
      type: 'date',
    },
    {
      key:'staffDimissionDate',
      label:'离职时间',
      type: 'date',
    },
    {
      key:'createUser',
      label:'创建用户',
    },
    {
      key:'createTime',
      label:'创建时间',
      type: 'date',
    },
    {
      key:'operator',
      label:'操作用户',
    },
    {
      key:'operateTime',
      label:'操作时间',
      type: 'date',
    }
  ];
  errorMessage;

  constructor(private staffManageService:StaffManageService,private renderer:Renderer, protected _uploader:Ng2Uploader,private gs:GlobalState){
    gs.subscribe('getOrgId',(data)=>{
        if(data!=null){
          this.staffOrgName = data.orgName;
          this.currentStaff.staffOrgId = data.id;
        }
      })
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

  getAccountList(): void {
    if(this.isCognate == true){
      this.selsectNotes = '';
      this.cognateAccount = [];
      this.accountList = [];
      if(this.currentStaff.staffNo){
        let map1 = {key:this.currentStaff.staffNo,label:'员工编号'};
        this.accountList.push(map1)
      }
      if(this.currentStaff.staffPhone){
        let map1 = {key:this.currentStaff.staffPhone,label:'手机号'};
        this.accountList.push(map1)
      }
      if(this.currentStaff.staffMail){
        let map1 = {key:this.currentStaff.staffMail,label:'邮箱'};
        this.accountList.push(map1)
      }
      if(this.currentStaff.staffWechat){
        let map1 = {key:this.currentStaff.staffWechat,label:'微信'};
        this.accountList.push(map1)
      }
    }else{
      this.accountList = [];
      this.cognateAccount = [];
      this.selsectNotes = '';
      this.currentRole = null;
    }
    let mulitiColloneArray = [];
    if(this.accountList){
      let x = 1;
      this.accountList.forEach(function (brand) {
        mulitiColloneArray.push({id: brand.key, name: brand.label});
      });
    }
    this.accountData = mulitiColloneArray;
  }

  //请求service
  getStaffs(): void {
    this.staffManageService.getStaffs()
      .subscribe(
        res => {
          this.data = res.data;
        },
        error =>  this.errorMessage = <any>error);
  }

  onChange(message):void {

    if(message.type=='add'){
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
    }
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
    this.search = {
      staffDtoNo:'',
      staffDtoName:'',
      staffDtoCardId:'',
    };
  }

  saveStaff(): void{
    if(this.currentStaff.id){
      let newStaffDto = new NewStaffDto;
      newStaffDto.buzStaffDto = this.currentStaff;
      newStaffDto.account = this.cognateAccount;
      newStaffDto.sysRole = this.currentRole;
      this.staffManageService.updateStaff(newStaffDto)
        .subscribe(
          res => {
            this.isCognate = false;
            this.checkAllinput = false;
            this.currentStaff = false;
            this.staffOrgName = '';
            this.getStaffs();
          },
          error =>  this.errorMessage = <any>error);
    }else{
      let newStaffDto = new NewStaffDto;
      newStaffDto.buzStaffDto = this.currentStaff;
      newStaffDto.account = this.cognateAccount;
      newStaffDto.sysRole = this.currentRole;
      this.staffManageService.addStaff(newStaffDto)
        .subscribe(
          res => {
            this.isCognate = false;
            this.checkAllinput = false;
            this.currentStaff = false;
            this.staffOrgName = '';
            this.getStaffs();
          },
          error =>  this.errorMessage = <any>error);
    }
  }

  getCurrentRoles(): void{
    this.staffManageService.getCurrentRoles()
      .subscribe(
        res => {
          this.roleData = res.data;
          this.currentRole = {roleName:'请选择'};
          this.roleData.push(this.currentRole);
        },
      error =>  this.errorMessage = <any>error);
  }

  renderSearch() {
    if(this.search.staffDtoNo||this.search.staffDtoName||this.search.staffDtoCardId){
      return false;
    }else{
      return true;
    }
  }

  noSearch() {
    if(!this.search.staffDtoNo&&!this.search.staffDtoName&&!this.search.staffDtoCardId){
      this.getStaffs();
    }
  }

  getStaffByTerms(): void{
      let searchStaffDto = new SearchStaffDto;
      searchStaffDto.staffDtoNo = this.search.staffDtoNo;
      searchStaffDto.staffDtoName = this.search.staffDtoName;
      searchStaffDto.staffDtoCardId = this.search.staffDtoCardId;
      this.staffManageService.getStaffByTerms(searchStaffDto)
        .subscribe(
          res => {
            this.data = res.data;
          },
          error =>  this.errorMessage = <any>error);
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
}

