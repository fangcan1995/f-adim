import {Component, ViewEncapsulation, OnInit, ViewChild,ChangeDetectorRef,EventEmitter,ElementRef,Renderer} from '@angular/core';
import {carService} from "../car-manage.service";
import {CAR_TRANSLATE} from "./car.translate";
import {contractService} from "../../contract-manage/contrat-manage.service";
import {Ng2Uploader} from "ng2-uploader";

@Component({
  selector: 'carComponent',
  templateUrl: './carComponent.html',
  styleUrls: ['./car.component.css'],
  providers: [contractService,Ng2Uploader],

})
export class carComponent {

  @ViewChild('fileUpload') protected _fileUpload:ElementRef;
  onUpload:EventEmitter<any> = new EventEmitter();
  onUploadCompleted:EventEmitter<any> = new EventEmitter();

  translate = CAR_TRANSLATE;
  showerror = false;
  data = [];
  currentAttachments = [];
  errorMessage;
  currentCar ;
  search = {
    start:'',
    end: ''
  };
  titles = [
    {
      key: 'vehicleNumber',
      label: '车辆号',
    },
    {
      key: 'vehicleBrand',
      label: '品牌型号',
    },
    {
      key: 'vehicleType',
      label: '车辆类型',
      isDict: true,
    },
    {
      key: 'vehicleNature',
      label: '使用性质',
      isDict: true,
    },
    {
      key: 'vehicleLoad',
      label: '载重',
    },
    {
      key: 'vehicleSquare',
      label: '方数',
    },
    {
      key: 'vehicleState',
      label: '车辆状态',
      isDict: true,
    },
    {
      key: 'purchaseTime',
      label: '购入时间',
    },
  ];

  titleOption = [
    {
      key: 'vehicleNumber',
      label: '车辆号',
    },
    {
      key: 'vehicleBrand',
      label: '品牌型号',
    },
    {
      key: 'vehicleType',
      label: '车辆类型',
      isDict: true,
    },
    {
      key: 'vehicleNature',
      label: '使用性质',
      isDict: true,
    },
    {
      key: 'vehicleLoad',
      label: '载重',
    },
    {
      key: 'vehicleSquare',
      label: '方数',
    },
    {
      key: 'vehicleCode',
      label: '车辆标识码',
    },
    {
      key: 'purchaseTime',
      label: '购入时间',
    },
    {
      key: 'engineCode',
      label: '发动机号',
    },
    {
      key: 'vehicleState',
      label: '车辆状态',
      isDict: true,
    },
  ];

  constructor(private carService: carService,private contractService:contractService,private renderer:Renderer, protected _uploader:Ng2Uploader) {
  }

  ngOnInit() {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars()
      .subscribe(
        res => {
          console.log(res.data)
          this.data = res.data;
        },
        error => this.errorMessage = <any>error);
  }


  onChange(message): void {

    if (message.type == 'add') {
      this.showerror = false;
      this.currentAttachments = [];
      this.currentCar = {
        vehicleState : '02'
      };
    }
    if (message.type == 'update') {
      this.showerror = false;
      //let d = new Date(message.data.purchaseTime);
     // message.data.purchaseTime = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate();
      this.currentAttachments = [];
      this.currentCar = message.data;
      this.contractService.getContractAttach(this.currentCar.id)
        .subscribe(
          res => {
            console.log(res.data)
            this.currentAttachments = res.data;

          },
          error =>  this.errorMessage = <any>error);
    }
    if (message.type == 'delete') {
      this.carService.removeCar(message.data.id)
        .subscribe(
          res => {
            this.getCars();
          },
          error =>  this.errorMessage = <any>error);
    }
    if (message.type == 'delete_all') {
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id)
      });
      this.carService.removeAllSelectedCars(ids.toString())
        .subscribe(
          res => {
            this.getCars();
          },
          error =>  this.errorMessage = <any>error);

    }
  }

  saveCar():void{
    if(this.currentCar.id){
      this.carService.updateCar(this.currentCar)
        .subscribe(
          res => {
            this.currentCar = false;
            this.getCars();
          },
          error =>  this.errorMessage = <any>error);

      if(this.currentAttachments.length){
        this.contractService.updateAttach(this.currentAttachments)
          .subscribe(
            res1 => {
              console.log(res1.data)
            },
            error =>  this.errorMessage = <any>error);
      }else{
        this.contractService.deleteByBuzId(this.currentCar.id)
          .subscribe(
            res1 => {
              console.log(res1.data)
            },
            error =>  this.errorMessage = <any>error);
      }
    }else{
      this.carService.addCar(this.currentCar)
        .subscribe(
          res => {
            this.currentCar = false;

            if(this.currentAttachments.length){
              this.currentAttachments.forEach(function(x){
                x.buzId = res.data;
              })
              this.contractService.updateAttach(this.currentAttachments)
                .subscribe(
                  res1 => {
                    console.log(res1.data)
                  },
                  error => this.errorMessage = <any>error);
            }


            this.getCars();
          },
          error =>  this.errorMessage = <any>error);
    }
  }

  cancel(): void{
    this.currentCar = false;
    this.search = {
      start:'',
      end: ''
    };
    this.getCars();
  }

  renderValidDate(){
    let res = true;
    if(this.search.start!=''&&this.search.end!=''){
      res = false;
    }
    return res;
  }


  searchByDate():void {

    this.carService.searchCar(this.search)
      .subscribe(
        res => {
          this.data = res.data;
        },
        error => this.errorMessage = <any>error);

  }














  public uploadInProgress:boolean = false;
  public onFiles():void {

    let files = this._fileUpload.nativeElement.files;
    console.log(files)
    if(files&&files[0]){
      let fd = new FormData();
      fd.append('file', files[0]);
      console.log(fd)

      this.contractService.updateAttachFile(fd)
        .subscribe(
          res1 => {
            this.currentAttachments.push({
              buzId: this.currentCar.id,
              attachUrl:res1.data,
              attachSize:files[0].size,
              attachType:res1.data.split('.')[1],
              attachName:files[0].name,
            });



          },
          error =>  this.errorMessage = <any>error);
    }



    /*
     if(files[0]&&files[0].size<2*1048576){

     console.log(files[0].type)
     this.imageError = false;
     if (files.length) {
     const file = files[0];
     this._changePicture(file);
     let reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () =>{
     // this.currentStaff.file = reader.result;
     this.currentAttachments.push({
     buzId: this.currentcontract.id,
     attachUrl:reader.result,
     attachSize:files[0].size,
     attachType:files[0].type.split('/')[1],
     attachName:files[0].name,
     });
     //console.log(reader.result)
     };
     if (this._canUploadOnServer()) {
     this.uploadInProgress = true;
     this._uploader.addFilesToQueue(files);
     }
     }

     }else{
     //this.imageError = "请您选择小于1Mb的图片。";
     alert("请您选择小于2Mb的附件。")
     }*/
  }

  removeAttach(index){
    this.currentAttachments.splice(index,1);
  }

  downloadAttach(attach){
    window.open(attach.attachUrl);
  }

  public bringFileSelector():boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }


  picture;
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

  public uploaderOptions:any = {
    // url: 'http://website.com/upload'
  };
  protected _canUploadOnServer():boolean {
    return !!this.uploaderOptions['url'];
  }





}
