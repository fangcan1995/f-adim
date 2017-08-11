import {Component, Input, OnInit} from "@angular/core";
import {InStorageService} from "../../in-storage-manage.service";
import {ExStorageService} from "../../ex-storage-manage.service";
import {STORAGE_TRANSLATE} from "../../storage.translate";
import {PurchaseOrderService} from "../../../../../purchase-manage/modules/purchase-order/purchase-order.service";
import {jsonTree} from "../../../../../../../../theme/utils/json-tree";
import {CustomerManageService} from "../../../../../../../basic_info/modules/customer-manage/customer-manage.service";
@Component({
  selector: 'in-ex-storage-list',
  templateUrl: './storage.list.html',
  styleUrls: ['./storage.list.css'],
  providers: [ PurchaseOrderService,CustomerManageService],
})
export class InExStorageListComponent  implements OnInit {

  translate = STORAGE_TRANSLATE;
  @Input() type;
  @Input() finance;
  storageList = [];
  staffs = [];
  supplierName;
  currentOrderEditId;
  currentOrderId;
  storageService;
  errorMessage;
  currentOrder;
  selectedStaffName;
  search = {
    orderType: '00',
    startDate: '',
    endDate: '',
    supplierId: '',
    storekeeperId: '',
    customerStoreId:''
  };
  inTitles = [
    {
      key: 'poNum',
      label: '订单编号',
      type: 'link'
    },
    {
      key: 'poType',
      label: '订单分类',
      isDict:true,
    },
    {
      key: 'staffName',
      label: '销售人员'
    },
    {
      key: 'poState',
      label: '订单状态',
      isDict:true,
    },
    {
      key: 'supplierName',
      label: '供应商'
    },
    {
      key: 'poDate',
      label: '订单日期'
    },
    {
      key: 'poTotalAmount',
      label: '订单总金额'
    }
  ];

  inOrderTitles = [
    {
      key: 'soNum',
      label: '订单编号',
      type: 'link'
    },
    {
      key: 'soType',
      label: '订单分类',
      isDict:true,
    },
    {
      key: 'soState',
      label: '订单状态',
      isDict:true,
    },
    {key:'customerName', label:'客户名称'},
    {key:'storeName', label:'门店名称'},
    {
      key: 'operateTime',
      label: '订单日期'
    },
    {
      key: 'soTotalAmount',
      label: '订单总金额'
    }
  ];


  outTitles = [
    {key:'poNum', label:'订单编号',type:'link'},
/*    {key:'poCategory', label:'销售分类',isDict:true},*/
    {key:'poType', label:'订单类型',isDict:true},
    {key:'poTotalAmount', label:'订单金额'},
    {
      key: 'staffName',
      label: '库管人员'
    },
    {
      key: 'poState',
      label: '订单状态',
      isDict:true,
    },
    {
      key: 'supplierName',
      label: '供应商'
    },
    {
      key: 'poTotalAmount',
      label: '订单总金额'
    }
  ];

  outOrderTitles= [
    {key:'soNum', label:'销售编号',type:'link'},
    {key:'soType', label:'销售类型',isDict:true},
    {key:'customerName', label:'客户名称'},
    {key:'storeName', label:'门店名称'},
    {key:'soCategory', label:'销售分类',isDict:true},
    {key:'soTotalAmount', label:'销售金额',},
    {key:'staffName', label:'销售人员',isDict:true},
    {key:'soState', label:'订单状态',isDict:true},
    {
      key: 'soTotalAmount',
      label: '订单总金额'
    }
  ];
  shippinglist:any ={

  };

  constructor(private _customerService:CustomerManageService,private inStorageService: InStorageService, private exStorageService: ExStorageService, private service: PurchaseOrderService) {
  }

  ngOnInit() {
    if ((this.type == 'in'&&this.search.orderType=='00')||(this.type == 'ex'&&this.search.orderType=='01')) {
      this.storageService = this.inStorageService;
    } else if ((this.type == 'in'&&this.search.orderType=='01')||(this.type == 'ex'&&this.search.orderType=='00')) {
      this.storageService = this.exStorageService;
    }
    this.getList('00');
    this.getCustomer();

    this.service.getStaffsWithOrgs().then(result => {
      if (result.success) {
        result.data.map(res => {
          if (res.customNodeType == 'org') {
            res['customIcon'] = 'fa fa-sitemap';
          }
          if (res.customNodeType == 'staff') {
            res['customIcon'] = 'ion-person';
          }
        });
        this.staffs = jsonTree(result.data);
      } else {
        alert(result.message);
      }
    })
  }

  getCustomer() {
    this._customerService.getCustomer().then((data) => {
      console.log("customer" + data.data);
      this.shippinglist.customerdata = data.data;
    });
  }

  typeChange(customerinfo) {
    //alert(customerinfo);
    if( customerinfo != "") {
      this._customerService.getCustomerById(customerinfo).then((data) => {
        console.log("customerbyId" + data.data);
        this.shippinglist.customerstoredata = data.data.listStore;
      });
    }else {
      this.shippinglist.customerstoredata = [];
    }
    this.shippinglist.customerStoreId = "";

  }

  getList(id) {
    this.storageService.getList({orderType: id})
      .subscribe(
        res => {
          console.log(res.data);
          this.storageList = res.data;
        },
        error => this.errorMessage = <any>error);
  }

  onChange(event) {
    console.log(event)
    if (event.type == 'detail'&&!this.finance) {
      this.currentOrder = event.data;
      console.log(this.search.orderType)
      if(this.search.orderType=='00'){
        this.currentOrderId = event.data.poNum;
      }else if(this.search.orderType=='01'){
        this.currentOrderId = event.data.soNum;
      }

    }
    if(event.type=='link'){
      this.currentOrderEditId = event.data.id;
    }
  }

  onSelect(event) {
    if (event.type == 'select') {
      this.supplierName = event.data.supplierName;
      this.search.supplierId = event.data.id;
    }
  }

  onTreePickerNotify(event) {
    if(event.data&&event.data.length){
      this.search.storekeeperId = event.data[0].id;
      this.selectedStaffName = event.data[0].data.name;
    }
  }


  currentOrderIdChange(event) {
    if (event.type == 'cancel') {
      this.currentOrderId = false;
    }
  }

  currentOrderEditIdChange(event){
    if (event.type == 'cancel') {
      this.currentOrderEditId = false;
      this.search_list();
    }
  }

  currentTypeChange(type){
    console.log(type)
    if(type){
      if ((this.type == 'in'&&this.search.orderType=='00')||(this.type == 'ex'&&this.search.orderType=='01')) {
        console.log('in')
        this.storageService = this.inStorageService;
      } else if ((this.type == 'in'&&this.search.orderType=='01')||(this.type == 'ex'&&this.search.orderType=='00')) {
        console.log('ex')
        this.storageService = this.exStorageService;
      }

      this.getList(type);
      this.cancel_search();
    }

  }


  cancel_search(){
    this.search.startDate = '';
    this.search.endDate = '';
    this.search.supplierId = '';
    this.search.storekeeperId = '';
    this.search.customerStoreId = '';
    this.supplierName = '';
    this.selectedStaffName = '';
    this.getList(this.search.orderType);
  }

  search_list(){
    console.log(this.search);
    this.storageService.getList(this.search)
      .subscribe(
        res => {
          console.log(res.data);
          this.storageList = res.data;
        },
        error => this.errorMessage = <any>error);
  }

}

