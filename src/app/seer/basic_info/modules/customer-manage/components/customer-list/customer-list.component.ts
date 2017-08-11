import {Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, Renderer} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {CustomerManageService} from "../../customer-manage.service";
import {Router} from "@angular/router";
import {GlobalState} from "../../../../../../global.state";


@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  providers: [CustomerManageService],
  styleUrls: ['./customer-list.scss'],
  encapsulation: ViewEncapsulation.None
})


export class CustomerListComponent implements OnInit{
  title = '客户列表';

  source: LocalDataSource = new LocalDataSource();

  resource = [];
  data1 = [];



  constructor(
    protected service: CustomerManageService,private _router: Router,private _state:GlobalState,private renderer:Renderer) {
      this.getAllDate();
  }


  ngOnInit() {
    this._state.subscribe('search-customer-list',param=> {
      if (param.customerName || param.customerNature ) {
        this.getDateByCondition(param);
      }else {
        this.getDateByCondition(param);
        //this.getAllDate();
      }
    });
  }

  getAllDate() {
    this.service.getCustomer().then((data) => {
      //console.log(data.data);
      this.data1 = data.data;
    });
  }

  getDateByCondition(condition:any) {
    this.service.searchCustomer(condition).then((data) => {
      this.data1 = data.data;
    });
  }

  titles = [
    {
      key:'customerName',
      label:'客户名称'
    },
    // {
    //   key:'id',
    //   label:'客户编号'
    // },
    {
      key:'customerCode',
      label:'客户企业代码'
    }
    ,
    {
      key:'customerTaxCode',
      label:'税号'
    }
    ,
    {
      key:'customerAddress',
      label:'客户地址'
    }
    ,
    {
      key:'customerTel',
      label:'办公电话'
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
      key:'customerName',
      label:'客户名称'
    },
    // {
    //   key:'id',
    //   label:'客户编号'
    // },
    {
      key:'customerCode',
      label:'客户企业代码'
    }
    ,
    {
      key:'customerTaxCode',
      label:'税号'
    }
    ,
    {
      key:'customerAddress',
      label:'客户地址'
    }
    ,
    {
      key:'customerTel',
      label:'办公电话'
    }
  ];




  onChange(message):void {

    if(message.type=='add'){
      //alert("add");
      this._router.navigate(['/seer/basic/customer-manage/edit']);
    }

    if(message.type=='update'){
      // let param:DynamicComponentParam = {component: ResourceEditComponent, data: { data: message.data } };
      // this._state.notify('create.dynamic.component',param);//现在通过广播动态加载
      this._router.navigate(['/seer/basic/customer-manage/edit',message.data.id]);
    }

    if(message.type=='delete'){
      //alert(message.data.resourceId);
      //alert("delete");
      this.service.deleteCustomer(message.data.id).then((data) => {
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


      this.service.deleteCustomer(ids.toString()).then((data) => {
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
      this.downloadTemplate("customerImport");
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
    console.log(this.titles);

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
  public action;
  public alert_content='';

  public onFiles():void {

    let files = this._fileUpload.nativeElement.files;
    console.log(files)
    if (files && files[0]) {
      let fd = new FormData();
      fd.append('file', files[0]);
      fd.append('type','customerImport')
      console.log(fd)

      // this.service.importExcel(fd).then(result => {
      //   console.log(result.json().data);
      // });
      this.service.importExcel(fd)
        .subscribe(
          res1 => {
            console.log(res1);
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
