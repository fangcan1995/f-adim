import {
  Component, ViewEncapsulation, OnInit, ViewChild, Input, EventEmitter, Output, OnChanges, ElementRef,
  Renderer
} from '@angular/core';
import {contractService} from "../../contrat-manage.service";
import {SupplierManageService} from "../../../supplier-manage/supplier-manage.service";
import {BaseService} from "../../../../../base.service";
import {Supplier} from "../../../../../model/basic_info/supplier";
import {CustomerManageService} from "../../../customer-manage/customer-manage.service";
import {BrandManageService} from "../../../brand-manage/brand-manage.service";
import {CONTRACT_TRANSLATE} from "../contract.translate";
import {Ng2Uploader} from "ng2-uploader";

@Component({
  selector: 'contractEditComponent',
  templateUrl: './contractEditComponent.html',
  styleUrls: ['./contractEditComponent.css'],
  providers: [SupplierManageService,BaseService,CustomerManageService,BrandManageService,Ng2Uploader],

})
export class contractEditComponent implements OnChanges{
  translate = CONTRACT_TRANSLATE;
  @Input() currentcontract;
  @ViewChild('fileUpload') protected _fileUpload:ElementRef;
  onUpload:EventEmitter<any> = new EventEmitter();
  onUploadCompleted:EventEmitter<any> = new EventEmitter();


  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  supplierClientType ;
  errorMessage;
  supplierSource = [];
  clientSource = [];
  secondPartyName = '';
  contractBrands = [];
  currentBrands = [];
  currentBrandList = [{brandName:'请选择',id:'00'}]
  currentBrandRebate = [];
  showerror = false;
  constructor(private brandManageService:BrandManageService,private customerService:CustomerManageService,private contractService: contractService,private service:SupplierManageService, private baseService:BaseService<Supplier>,private renderer:Renderer, protected _uploader:Ng2Uploader) {

  }

  ngOnInit() {
    this.brandManageService.getBrand().then((res) => {
      this.currentBrands = res.data;
    });
  }

  ngOnChanges(currentcontract) {
    this.showerror = false;
    if(currentcontract){

      this.currentAttachments = [];

      if(this.currentcontract&&this.currentcontract.id){


        this.contractService.getContractAttach(this.currentcontract.id)
          .subscribe(
            res => {
              console.log(res.data)
              this.currentAttachments = res.data;


            },
            error =>  this.errorMessage = <any>error);





        if(this.currentcontract.contractType=='00'){
          this.supplierClientType = 'supplier';
        }else{
          this.supplierClientType = 'client';
        }
        let currentcontract = this.currentcontract;
        let currentBrandList = [{brandName:'请选择',id:'00'}];
        if(this.currentBrands.length){
          this.currentBrands.forEach(function(item){
            if(item.supplierId==currentcontract.secondParty){
              currentBrandList.push(item);
            }
          });
          this.currentBrandList = currentBrandList;
        }

        this.contractService.getContractBrand(this.currentcontract.id)
          .subscribe(
            res => {
              this.contractBrands = res.data;
            },
            error =>  this.errorMessage = <any>error);
      }else if(this.currentcontract&&!this.currentcontract.id){
        this.contractBrands = [];
        this.currentBrandList = [{brandName:'请选择',id:'00'}]
        this.currentcontract = {
          contractState: '',
          contractType: ''
        }
      }



      if(this.supplierSource&&this.supplierSource.length){
        if(this.currentcontract&&this.currentcontract.contractType&&this.currentcontract.contractType=='00'){
          this.secondPartyName = '';
          this.rendersecondPartyName(this.currentcontract.secondParty)
        }
      }else{
        this.service.searchSuppliers({}).then((result) => {
          this.supplierSource = result.data;
          if(this.currentcontract&&this.currentcontract.contractType&&this.currentcontract.contractType=='00'){
            this.secondPartyName = '';
            this.rendersecondPartyName(this.currentcontract.secondParty)
          }
        });
      }

      if(this.clientSource&&this.clientSource.length){
        if(this.currentcontract&&this.currentcontract.contractType&&this.currentcontract.contractType=='01'){
          this.secondPartyName = '';
          this.rendersecondPartyNameClient(this.currentcontract.secondParty)
        }
      }else{
        this.customerService.getCustomer().then((result) => {
          this.clientSource = result.data;
          if(this.currentcontract&&this.currentcontract.contractType&&this.currentcontract.contractType=='01'){
            this.secondPartyName = '';
            this.rendersecondPartyNameClient(this.currentcontract.secondParty)
          }
        });

      }

    }
  }
  rendersecondPartyNameClient(type){
    let value ;
    this.clientSource.forEach(function(o){
      if(o.id==type){
        value = o.customerName;
      }
    });
    this.secondPartyName = value;
  }

  rendersecondPartyName(type){
    let value ;
    this.supplierSource.forEach(function(o){
      if(o.id==type){
        value = o.supplierName;
      }
    });
    this.secondPartyName = value;
  }


  savecontract() {
    if(!this.showerror){
      this.showerror = true;
      return false;
    }

    if(this.currentcontract.id){
      this.contractService.updatecontract(this.currentcontract)
        .subscribe(
          res => {
            this.notify.emit('diaplay_list');

            if(this.contractBrands.length){
              this.contractService.updateContractBrand(this.contractBrands)
                .subscribe(
                  res1 => {
                    console.log(res1.data)
                  },
                  error =>  this.errorMessage = <any>error);
            }
            if(this.currentAttachments.length){
              this.contractService.updateAttach(this.currentAttachments)
                .subscribe(
                  res1 => {
                    console.log(res1.data)
                  },
                  error =>  this.errorMessage = <any>error);
            }



          },
          error =>  this.errorMessage = <any>error);
    }else{
      this.contractService.addcontract(this.currentcontract)
        .subscribe(
          res => {
            console.log(res.data)//id

            if(this.contractBrands.length){
              this.contractBrands.forEach(function(x){
                x.contractId = res.data;
              })
              this.contractService.updateContractBrand(this.contractBrands)
                .subscribe(
                  res1 => {
                    console.log(res1.data)
                  },
                  error =>  this.errorMessage = <any>error);
            }

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
            this.notify.emit('diaplay_list');
          },
          error =>  this.errorMessage = <any>error);
    }
    this.secondPartyName = '';
    this.supplierClientType = '';
  }
  cancel(): void{
    this.notify.emit('diaplay_list');
    this.secondPartyName = '';
    this.supplierClientType = '';
  }

  onSelect(event){
    if(event.type=='select'){
      this.currentcontract.secondParty = event.data.id;
      if(this.supplierClientType=='client'){
        this.secondPartyName = event.data.customerName;
      }else{
        this.secondPartyName = event.data.supplierName;

        let currentcontract = this.currentcontract;
        let currentBrandList = [{brandName:'请选择',id:'00'}]
        if(this.currentBrands.length){
          this.currentBrands.forEach(function(item){

            if(item.supplierId==currentcontract.secondParty){
              currentBrandList.push(item);
            }
          });
          this.currentBrandList = currentBrandList;
        }


      }


    }

  }

  addBrand(){
    this.contractBrands.push({
      id:new Date().getTime(),
      contractId:this.currentcontract.id,
      brandId: '00',
      brandRule:[{
        'type':'规则类型',
        'mode':'类型方式',
        'condition': '规则条件',
        'value':''
      }]
    });
  }

  typeChange(type){

    if(type=='00'){
      this.supplierClientType = 'supplier';
    }else if(type=='01'){
      this.supplierClientType = 'client';
    }else{
      this.supplierClientType = false;
    }

    this.secondPartyName = '';
    this.currentcontract.secondParty = '';

  }


  removeBrand(index){
    this.contractBrands.splice(index,1);
  }

  currentBrandId;
  openRebateModal(x){

    if(x.id){
      this.currentBrandId = x.id;
      this.contractService.getRebateByBrandId(x.id)
        .subscribe(
          res => {
            let data = res.data;

  /*          data.forEach(function(x){
              let d = new Date(x.startTime);
              x.startTime = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate();
              let e = new Date(x.endTime);
              x.endTime = e.getFullYear()  + "-" + (e.getMonth()+1) + "-" + e.getDate();
            });*/

            this.currentBrandRebate = data;
          },
          error =>  this.errorMessage = <any>error);
    }else{
      this.currentBrandRebate = [];
    }

  }


  addRebate(){
    this.currentBrandRebate.push({

      contractBrandId:this.currentBrandId,
      startTime:'',
      endTime:''
    })
  }


  saveRebate(){
    console.log(this.currentBrandRebate)
    this.contractService.updateRebate(this.currentBrandRebate)
      .subscribe(
        res => {
          console.log(res.data)

        },
        error =>  this.errorMessage = <any>error);
  }

  removeRebate(index){
    this.currentBrandRebate.splice(index,1);
  }

  imageError;
  currentAttachments = [];
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
              buzId: this.currentcontract.id,
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




  brandRuleChanged(item){
    if(item){
      console.log(item)
      if(item.type=='现金'){
        item.mode = '额度';
        item.condition = '等于';
      }else if(item.type=='账期'){
        item.condition = '天';
      }
    }
  }















}

