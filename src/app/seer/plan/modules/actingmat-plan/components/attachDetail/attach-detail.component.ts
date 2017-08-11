import {Component, ViewEncapsulation, OnInit, ViewChild, EventEmitter, ElementRef, Renderer} from '@angular/core';
import {Json} from "../../../../../login/Json";
import {
  DynamicComponentLoader,
  BaseModalComponent
} from "../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {ModalComponent} from "../../../../../../theme/components/ng2-bs4-modal/modal";
import {GlobalState} from "../../../../../../global.state";
import {ActingmatPlanService} from "../../actingmat-plan.service";
import {InvActingMatBudgetDto} from "../../InvActingMatBudgetDto";
import {Ng2Uploader} from "ng2-uploader";
import {DeleteDto} from "./DeleteDto";

@Component({
  selector: 'attachDetailComponent',
  styleUrls: ['./attach-detail.component.scss','./attach-detail-head.component.css'],
  templateUrl: './attach-detail-component.html',
  providers: [Ng2Uploader],
  encapsulation: ViewEncapsulation.None,
})
export class AttachDetailComponent extends BaseModalComponent implements OnInit{
  title = '上传核销资料';
  pictureTitle = '上传图片';
  datumTitle = '上传资料';
  //上传相关方法开始
  imageError;
  datumError;
  public defaultPicture = 'assets/img/theme/add-photo.png';
  public defaultDatum = 'assets/img/theme/add-datum.png';
  public picture = 'assets/img/theme/add-photo.png';
  canDelete:boolean = true;

  @ViewChild('fileUpload')  _fileUpload:ElementRef;
  @ViewChild('datumUpload')  _datumUpload:ElementRef;

  public uploadInProgress:boolean = false;
  //上传相关方法收尾
  budget:InvActingMatBudgetDto = new InvActingMatBudgetDto();
  errorMessage;
  pictureList = [];
  pictureFile ;
  datumFile ;
  datumList = [];

  animation: boolean = true;
  backdrop: string | boolean = true;

  ATTACHEVENT = 'openActingAttachDetail';

  @ViewChild(ModalComponent) modal: ModalComponent;

  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  constructor(private _state: GlobalState, private actingmatPlanService: ActingmatPlanService ,private renderer:Renderer, private _renderer:Renderer,protected _uploader:Ng2Uploader){
    super();
    // /*弹出新增、修改页面订阅事件*/
    // this._state.subscribe(this.EVENT, (param) => {
    //   this.openModal(param);
    // });

  }

  ngOnInit() {
    this.budget =  this.data.budget;
    //上传文件相关
    this.getAllAttaches();
  }

  //获取初始化数据
  getAllAttaches(){
    this.actingmatPlanService.getContractAttach(this.budget.id)
      .subscribe(
        res => {
          if(res.data.length>0){
            res.data.forEach(attach=>{
              if(attach.attachType == 'picture'){
                this.pictureList.push(attach);
              }
              if(attach.attachType == 'word'){
                this.datumList.push(attach);
              }
            });
          }

        },
        error =>  this.errorMessage = <any>error);
  }

  public onPictures():void {
    let files = this._fileUpload.nativeElement.files;
    if(files[0].size<524288){
      if(files[0].type == ("image/png")||
        files[0].type == ("image/jpeg")||
        files[0].type == ("image/jpg")||
        files[0].type == ("image/bmp")||
        files[0].type == ("image/gif")){
        this.imageError = '';
        if(files&&files[0]){
          let fd = new FormData();
          fd.append('file', files[0]);
          this.actingmatPlanService.updateAttachFile(fd)
            .subscribe(
              res1 => {
                this.pictureList.push({
                  buzId: this.budget.id,
                  attachUrl:res1.data,
                  attachSize:files[0].size,
                  attachType:'picture',
                  attachName:files[0].name,
                });
              },
              error =>  this.errorMessage = <any>error);
        }
        // if (files.length) {
        //   const file = files[0];
        //   this._changePicture(file);
        //   let reader = new FileReader();
        //   reader.readAsDataURL(file);
        //   reader.onload = () =>{
        //     this.pictureFile = reader.result;
        //   };
        //   if (this._canUploadOnServer()) {
        //     this.uploadInProgress = true;
        //     this._uploader.addFilesToQueue(files);
        //   }
        // }
      }else {
        this.imageError = "上传失败，请您选择格式为jpeg、jpg、bmp、gif、png的图片。";
      }
    }else{
      this.imageError = "上传失败，请您选择小于500Kb的图片。";
    }
  }

  public onDatums():void {
    let files = this._datumUpload.nativeElement.files;
    if(files[0].size<524288){
        this.datumError = '';
      if(files&&files[0]){
        let fd = new FormData();
        fd.append('file', files[0]);
        this.actingmatPlanService.updateAttachFile(fd)
          .subscribe(
            res1 => {
              this.datumList.push({
                buzId: this.budget.id,
                attachUrl:res1.data,
                attachSize:files[0].size,
                attachType:'word',
                attachName:files[0].name,
              });
            },
            error =>  this.errorMessage = <any>error);
      }
    }else{
      this.datumError = "上传失败，请您选择小于500Kb的文件。";
    }
  }

  public bringFileSelector():boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }
  public bringDatumSelector():boolean {
    console.log(this._datumUpload.nativeElement)
    this._renderer.invokeElementMethod(this._datumUpload.nativeElement, 'click');
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

  removeAttachPicture(index){
    this.pictureList.splice(index,1);
  }

  previewAttachPicture(attach){
    window.open(attach.attachUrl);
  }

  removeAttachDatum(index){
    this.datumList.splice(index,1);
  }

  previewAttachDatum(attach){
    window.open(attach.attachUrl);
  }

  getDatumSize(size) {
    let datumSize = 0;
    datumSize = Math.round(parseInt(size)/1024);
    return datumSize;
  }

  getDate(times){
    if(!times){
      let x = new Date();
      let year = x.getFullYear();
      let month = x.getMonth()+1;
      let day = x.getDate();
      let hour = x.getHours();
      let minutes = x.getMinutes();
      let seconds = x.getSeconds();
      let time = year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
      return time;
    }else{
      return times;
    }
  }

  onSave(){
    //有图更新
    if(this.pictureList.length){
      this.actingmatPlanService.updateAttach(this.pictureList)
        .subscribe(
          res1 => {
            console.log(res1.data)
          },
          error => this.errorMessage = <any>error);
    }
    //无图删除所有
    if(this.pictureList.length == 0){
      let deleteDto = new DeleteDto();
      deleteDto.buzId = this.budget.id;
      deleteDto.attachType = 'picture';
      this.actingmatPlanService.deleteByBuzIdAndType(deleteDto)
        .subscribe(
          res1 => {
            console.log(res1.data)
          },
          error => this.errorMessage = <any>error);
    }
    //有文件更新
    if(this.datumList.length){
      this.actingmatPlanService.updateAttach(this.datumList)
        .subscribe(
          res1 => {
            console.log(res1.data)
          },
          error => this.errorMessage = <any>error);
    }
    //无文件删除所有
    if(this.pictureList.length=0){
      let deleteDto = new DeleteDto();
      deleteDto.buzId = this.budget.id;
      deleteDto.attachType = 'word';
      this.actingmatPlanService.deleteByBuzIdAndType(deleteDto)
        .subscribe(
          res1 => {
            console.log(res1.data)
          },
          error => this.errorMessage = <any>error);
    }
    this.closeModal();
  }

  clean(){
    this.pictureList = [];
    this.datumList = [];
  }
}

