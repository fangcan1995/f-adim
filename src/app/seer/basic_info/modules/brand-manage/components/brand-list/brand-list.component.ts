import {Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, Renderer} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {BrandManageService} from "../../brand-manage.service";
import {Router} from "@angular/router";
import {GlobalState} from "../../../../../../global.state";
import {Ng2Uploader} from "ng2-uploader";
import {contractService} from "../../../contract-manage/contrat-manage.service";


@Component({
  selector: 'brand-list',
  templateUrl: './brand-list.component.html',
  providers: [BrandManageService],
  styles: ['./brand-list.scss'],
  encapsulation: ViewEncapsulation.None
})


export class BrandListComponent implements OnInit{
  title = '品牌列表';
  source: LocalDataSource = new LocalDataSource();

  resource = [];
  data1 = [];


  public action;
  public alert_content='';

  constructor(
    protected service: BrandManageService,
    private _router: Router,
    private _state:GlobalState,
    protected _uploader: Ng2Uploader,
    private contractService: contractService,
    private renderer:Renderer) {
      this.getAllDate();
  }


  ngOnInit() {
    this._state.subscribe('search-brand-list',param=> {
      if (param.brandCountry || param.supplierId ) {
        this.getDateByCondition(param);
      }else {
        this.getDateByCondition(param);
        //this.getAllDate();
      }
    });
  }

  downLoad() {
    //alert("Download");
    var url="http://localhost:8080/sys/excel/download";
    window.open(url);
  }

  downLoadByResponse() {
    //alert("Download");
    var url="http://localhost:8080/sys/excel/downloadByResonse";
    window.open(url);
  }




  getAllDate() {
    this.service.getBrand().then((data) => {
      this.source.load(data.data);
      this.data1 = data.data;
    });
  }

  getDateByCondition(condition:any) {
    this.service.searchBrand(condition).then((data) => {
      this.data1 = data.data;
    });
  }

  titles = [
    {
      key:'brandName',
      label:'品牌名称'
    },
    {
      key:'brandShortName',
      label:'品牌简称'
    },
    {
      key:'brandNumber',
      label:'品牌编号'
    }
    ,
    {
      key:'supplierName',
      label:'所属供应商'
    }
    ,
    {
      key:'brandCountry',
      label:'原产地',
      isDict:true,
      //
      // {key:'poState',label:'订单状态',isDict:true/**,dictKeyId:'PO_STATE',//因为字段名和字典键一致，不需要传dictKeyId*/},

    }
    ,
    {
      key:'brandMode',
      label:'合作方式',
      isDict:true
    }
    ,
    {
      key:'brandState',
      label:'品牌状态',
      isDict:true
    }

    // ,
    // {
    //   key:'isDelete',
    //   label:'删除标识'
    // }
    // ,
    // {
    //   key:'createTime',
    //   label:'创建时间'
    // }
  ];


  titleOption = [
    {
      key:'brandName',
      label:'品牌名称'
    },
    {
      key:'brandShortName',
      label:'品牌简称'
    },
    {
      key:'brandNumber',
      label:'品牌编号'
    }
    ,
    {
      key:'supplierName',
      label:'所属供应商'
    }
    ,
    {
      key:'brandCountry',
      label:'原产地',
      isDict:true,
    //
    // {key:'poState',label:'订单状态',isDict:true/**,dictKeyId:'PO_STATE',//因为字段名和字典键一致，不需要传dictKeyId*/},

    }
    ,
    {
      key:'brandMode',
      label:'合作方式',
      isDict:true
    }
    ,
    {
      key:'brandState',
      label:'品牌状态',
      isDict:true
    }
    ,
    {
      key:'isDelete',
      label:'删除标识',
      isDict:true
    }
    ,
    {
      key:'createTime',
      label:'创建时间'
    }
    ,
    {
      key:'createUser',
      label:'创建人'
    }
    ,
    {
      key:'operateTime',
      label:'更新时间 '
    },

    {
      key:'operator',
      label:'更新人'
    }
  ];




  onChange(message):void {

    if(message.type=='add'){
      //alert("add");
      this._router.navigate(['/seer/basic/brand-manage/edit']);
    }

    if(message.type=='update'){
      // let param:DynamicComponentParam = {component: ResourceEditComponent, data: { data: message.data } };
      // this._state.notify('create.dynamic.component',param);//现在通过广播动态加载
      this._router.navigate(['/seer/basic/brand-manage/edit',message.data.id]);
    }

    if(message.type=='delete'){
      //alert(message.data.resourceId);
      //alert("delete");
      this.service.deleteBrand(message.data.id).then((data) => {
        console.log(data.data);
        //message.confirm.reverse();
        if ( data.success ){
          this.getAllDate();
        }else {
          alert("删除失败");
        }
      });
    }


    if(message.type=='delete_all') {
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id)
      });
      //alert(ids.toString());
      //alert(message.data.resourceId);


      this.service.deleteBrand(ids.toString()).then((data) => {
        console.log(data.data);
        //message.confirm.reverse();
        if ( data.success) {
          this.getAllDate();
        }else {
          alert("删除失败");
        }
      });
    }

    if(message.type=='export') {
      //alert("export");
      this.downloadTemplate("brandImport");
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
    this.service.exportExcel(param).then(result=>{
      //console.log(result.json().data);
      this.download(result.json().data);
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
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;

  }
  @ViewChild('fileUpload') protected _fileUpload:ElementRef;
  imageError;
  currentAttachments = [];
  public uploadInProgress:boolean = false;
  errorMessage;

  public onFiles():void {

    let files = this._fileUpload.nativeElement.files;
    if (files && files[0]) {
      let fd = new FormData();
      fd.append('file', files[0]);
      fd.append('type','brandImport')

      // this.service.importExcel(fd).then(result => {
      //   console.log(result.json().data);
      // });
      this.service.importExcel(fd)
        .subscribe(
          res1 => {
              //alert(res1.data);
              this.alert_content = res1.data + "<br/>";
              this.action = 'show';


              this.getAllDate();
          },
          error =>  this.errorMessage = <any>error);

    }
  }

  onSelectAlert(event){
    //console.log(event);
      this.action = false;
  }



}
