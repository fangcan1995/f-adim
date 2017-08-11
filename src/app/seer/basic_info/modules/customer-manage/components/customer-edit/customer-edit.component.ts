import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {CustomerManageService} from "../../customer-manage.service";
import {CustomerModel} from "../../customer-model.class";
import {GlobalState} from "../../../../../../global.state";
import {
  DynamicComponentLoader,
  DynamicComponentParam
} from "../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {CustomerStoreAddedDialogComponent} from "../customer-store-dialog/customerstore-added-dialog.component";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [CustomerStoreAddedDialogComponent]

})
export class CustomerEditComponent implements OnInit {

  title : string;
  isAdd: boolean;
  editId: string;

  titleStore: string;

  listStore:any = [];

  titleOption = [
    {
      key:'storeName',
      label:'客户门店名称'
    },
    {
      key:'channelId',
      label:'渠道/业态'
    },
    {
      key:'storeLevel',
      label:'	门店级别'
    }
    ,
    {
      key:'staffName',
      label:'	开拓人员'
    }
  ];

  titles = [
    {
      key:'storeName',
      label:'客户门店名称'
    },
    {
      key:'channelId',
      label:'渠道/业态'
    },
    {
      key:'storeLevel',
      label:'	门店级别'
    }
    ,
    {
      key:'staffName',
      label:'	开拓人员'
    }
  ];

  customer:CustomerModel = new CustomerModel();

  constructor(
    private _router: Router,
    private service:CustomerManageService,
    private _activatedRoute:ActivatedRoute,
    private _state: GlobalState
  ) {

    /*弹出新增、修改页面订阅事件*/
    this._state.subscribe(this.EVENT, (param) => {
      this.openModal(param);
    });


    /*新增方法订阅事件*/
    this._state.subscribe(this.SAVEEVENT, (param) => {
      console.log(param);
      if(param.flag == "1") {
        //this.listStore = param.data;
        //修改
      }else {
        //新增
        param.data.indexDelete = this.listStore.length;
        this.listStore.push(param.data);

      }
    });

  }

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      // this.isAdd = params['isAdd'];
      this.editId = params['id'];
      this.isAdd = !this.editId;
    })

    this.title = this.isAdd ? '新建客户' : '修改客户';

    if(!this.isAdd) this.getResourceById(this.editId);

    this.titleStore = "客户门店"


  }

  getResourceById(id:string) {

    this.service.getCustomerById(id).then((data) => {
      console.log(data);
      this.customer = data.data.buzCustomer;



      this.listStore = data.data.listStore;

      for ( var i = 0; i < this.listStore.length; i ++ ) {
        this.listStore[i].indexDelete = i;
      }
      //console.log("indexDelete" + this.listStore[1].indexDelete);

    });
  }


  submitForm() {
    //alert(this.resource.resource_id);
    //alert(this.resource.resource_name);
    if(!this.isAdd){
      this.updateResource();
    }else{
      this.addResource();
    }
  }

  backList() {
    this._router.navigate(['/seer/basic/customer-manage/']);
  }

  updateResource() : void {
    //alert(this.resource.resourceId);
    this.customer.listStore = this.listStore;

    this.service.updateCustomer(this.customer).then((data) => {
      console.log(data.success);
      if(data.success) {
        //alert("1")  //新增成功跳转页面
        this._router.navigate(['/seer/basic/customer-manage/']);
      }else{
        //alert("0")
        alert("更新失败~" + data.message);
        this._router.navigate(['/seer/basic/customer-manage/edit',this.customer.id]);
      }
      //console.log(data.data);
    });
  }


  addResource() : void{

    this.customer.listStore = this.listStore;
    this.service.createCustomer(this.customer).then((data) => {
      console.log(data.success);

      //alert(data.success);

      if(data.success) {
        //alert("1")  //新增成功 跳转页面
        this._router.navigate(['/seer/basic/customer-manage/']);
      }else{
        //alert("添加失败~" + data.message);
        this._router.navigate(['/seer/basic/customer-manage/edit']);
      }
      //console.log(data.data);
    });
  }

  EVENT = 'openCustomerAddedDialog';
  SAVEEVENT = 'saveCustomerStore';
  EDITEVENT = 'editCustomerStore';

  @ViewChild(DynamicComponentLoader)
  dynamicComponentLoader: DynamicComponentLoader;

  public openModal(data) {
    this.dynamicComponentLoader.loadComponent(data.component,data.data);
  }
  /*弹出新增客户门店模态窗口*/
  popupAdd(): void {
    let param: DynamicComponentParam = {component: CustomerStoreAddedDialogComponent, data: {title:'新增门店', flag: '0'} };
    this._state.notify(this.EVENT, param);
  }

  /*弹出修改用户模态窗口*/
  popupEdit(event):void {
    let param: DynamicComponentParam = {component: CustomerStoreAddedDialogComponent, data: {user: event, title:'修改门店', flag: '1'} };
    this._state.notify(this.EVENT, param);
  }
  onChange(message):void {

    if(message.type=='add'){
      //alert("add");
      //this._router.navigate(['/seer/basic/customer-manage/edit']);
      this.popupAdd();
    }

    if(message.type=='update'){
      // let param:DynamicComponentParam = {component: ResourceEditComponent, data: { data: message.data } };
      // this._state.notify('create.dynamic.component',param);//现在通过广播动态加载
      //this._router.navigate(['/seer/basic/customer-manage/edit',message.data.id]);
      //alert("update");
      this.popupEdit(message.data);
    }

    if(message.type=='delete'){

      //alert(message.data.indexDelete);
      //alert("delete");
      //this.listStore.pop();
      //alert(message.data.id);
      this.listStore.splice(message.data.indexDelete,1);
      for ( var i = 0; i < this.listStore.length; i ++ ) {
        this.listStore[i].indexDelete = i;
      }

    }

    if(message.type=='delete_all') {
      let ids = [];
      message.data.forEach(function(item){
        ids.push(item.id)
      });
      //alert(ids.toString());
      //alert(message.data.resourceId);
    }
  }

}
