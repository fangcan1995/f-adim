import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {PurchaseOrder} from "../../../../../../../model/inventory/purchase-order";
import {Location} from '@angular/common';
import {PurchaseOrderService} from "../../purchase-order.service";
import {Goods} from "../../../../../../../model/basic_info/goods";
import {PurchaseGoods} from "../../../../../../../model/inventory/purchase-good";
import {PurchaseOrderVO} from "../VOs/purchase-order-vo";
import {Result} from "../../../../../../../model/result.class";
import {jsonTree} from "../../../../../../../../theme/utils/json-tree";
import {ActivatedRoute, Params} from "@angular/router";
import {seerTotalTableComponent} from "../../../../../../../common/seer_total_table/seer.total.table";
import {SERVER, PROCESS, FILTER_PROPERTY} from "../../../../../../../const";
import {DynamicComponentLoader} from "../../../../../../../../theme/directives/dynamicComponent/dynamic-component.directive";
import {PurchaseGoodsTitles} from "../const";
import * as _ from 'lodash';
@Component({
  selector: 'purchase-order-edit',
  styleUrls: ['../../style.scss'],
  styles: [
    `.input-group-btn{
      font-size: 14px;
    }`,
    `.input-group-btn > .btn{
        height: 35px;
        margin-left: -1px !important;
    }`
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './purchase-order-edit.component.html',
})
export class PurchaseOrderEditComponent implements OnInit {

  @ViewChild('selectedGoodsTable') seerTable: seerTotalTableComponent;
  @ViewChild(DynamicComponentLoader) dynamicComponentLoader: DynamicComponentLoader;

  title = '新增采购订单';
  orderNumLabel = '采购订单编号';
  supplierName: string;
  taskId;

  /** 采购订单 */
  poType = '00';

  purchaseOrder: PurchaseOrder = new PurchaseOrder();
  purchaseGoods: PurchaseGoods[] = [];
  purchaseGoodsTitles = PurchaseGoodsTitles;

  // purchaseOrderVO: PurchaseOrderVO = new PurchaseOrderVO();

  supplierGoods: Goods[] = [];
  supplierGoodsTitle = [
    {key: 'brandName', label: '品牌'},
    {key: 'goodsName', label: '商品名称'},
    {key: 'goodsNumber', label: '商品编码'},
    {key: 'goodsBarCode', label: '条形码'},
    {key: 'boxRule', label: '箱规'},
    {key: 'goodsPrice', label: '合同单价'},
  ];
  staffs = [];
  selectedStaffName;

  cachedSelectedGoodsIds = new Set();

  process;

  constructor(protected route?: ActivatedRoute, protected location?: Location, protected service?: PurchaseOrderService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.taskId = params['taskId'];
      if (params['orderId']) {
        this.service.getPurchaseOrderById(params['orderId']).then((result: Result) => {
          if (result.success) {
            this.purchaseOrder = result.data;
            this.selectedStaffName = this.purchaseOrder.staffName;
            this.supplierName = this.purchaseOrder.supplierName;

            let sessionData = localStorage.getItem('data');
            if (sessionData && !this.purchaseOrder.staffId) {
              let currentUser = JSON.parse(sessionData)['currentUser'];
              if (currentUser && currentUser.staffId) {
                this.purchaseOrder.staffId = currentUser.staffId;
                this.service.getAll(`${SERVER}/basic/staff/${currentUser.staffId}`).then(result => {
                  if (result.success) {
                    this.selectedStaffName = result.data.staffName;
                  } else {
                    alert(result.message);
                  }
                })
              }
            }

            this.service.getGoodsByPOId(params['orderId']).then((result: Result) => {
              if (result.success) {
                this.purchaseGoods = result.data;
                this.purchaseGoods.map(data => {
                  this.cachedSelectedGoodsIds.add(data.id);
                });
                this.service.getGoodsBySupplierId(this.purchaseOrder.supplierId).then((result: Result) => {
                  if (result.success) {
                    this.supplierGoods = result.data;
                    this.supplierGoods.map((good: Goods) => {
                      good['purchaseDiscount'] = 0;
                      good['purchaseQuantity'] = 0;
                      good['purchaseUnitPrice'] = good.goodsPrice;
                      good['purchaseTotalAmount'] = 0;
                      good['contractTotalAmount'] = 0;
                      if (this.cachedSelectedGoodsIds.has(good.id)) {
                        good['selected'] = true;
                      } else {
                        delete good['selected'];
                      }
                    })
                  } else {
                    alert(result.message);
                  }
                })
              } else {
                alert(result.message);
                this.cancel();
              }
            });

          } else {
            alert(result.message);
            this.cancel();
          }
          this.title = this.poType == '00' ? '修改采购订单' : '修改采购退单';
        });
      } else {
        this.purchaseOrder.poNum = (this.poType == '00' ? 'CG' : 'CT') + new Date().getTime();
        this.purchaseOrder.poState = '00';
        this.purchaseOrder.poSource = '00';
      }
    });
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
        this.staffs.map(el=>el.expanded=true)
      } else {
        alert(result.message);
        this.cancel();
      }
    });
    this.process = PROCESS.filterProcess(FILTER_PROPERTY.PURCHASE | (this.poType == '00' ? FILTER_PROPERTY.NORMAL : FILTER_PROPERTY.REFUND));
  }

  /**
   * 取消采购单
   */
  cancel(): void {
    if (confirm('确定放弃已填写的订单吗?')) {
      this.location.back();
    }
  }

  /**
   * 保存采购单
   */
  prepareOrder($event, formValid = true) {
    if (!formValid) {
      $event.stopPropagation();
      return;
    }
    if (this.purchaseGoods.length < 1) {
      alert('请添加至少一种商品');
      $event.stopPropagation();
      return false;
    }
    for (let i = 0; i < this.purchaseGoods.length; i++) {
      let good = this.purchaseGoods[i];
      if (!good.contractTotalAmount || !good.purchaseQuantity || !good.purchaseUnitPrice || !good.purchaseTotalAmount) {
        alert('请填写数量和价格');
        $event.stopPropagation();
        return false;
      }
    }
    return true;
  }

  save($event) {
    let purchaseOrderVO = new PurchaseOrderVO();
    if (!this.prepareOrder($event)) {
      return;
    }
    switch ($event.saveType) {
      case 'draft':
        this.purchaseOrder.poState = '00';
        break;
      case 'censor':
        this.purchaseOrder.poState = '01';
        let censorId = $event.selectedCensor;
        purchaseOrderVO.censorId = censorId;
        purchaseOrderVO.taskId = this.taskId;
        break;
      case 'direct':
        this.purchaseOrder.poState = '02';
        break;
    }
    this.purchaseOrder.poType = this.poType;
    purchaseOrderVO.purchaseOrder = this.purchaseOrder;
    purchaseOrderVO.goods = this.purchaseGoods;
    if (this.purchaseOrder.id) {
      this.service.updateOrder(purchaseOrderVO).then(result => {
        if (result.success) {
          alert('保存成功');
          this.location.back();
        } else {
          alert(result.message)
        }
      });
    } else {
      this.service.saveOrder(purchaseOrderVO).then(result => {
        if (result.success) {
          alert('保存成功');
          this.location.back();
        } else {
          alert(result.message)
        }
      });
    }
  }

  /**
   * 保存采购单
   */
  relateFare() {

  }

  /**
   * 选择了供应商事件
   */
  onSelectSupplier($event) {
    if (this.purchaseGoods.length == 0 || confirm('已选商品会清空，确定要修改供应商吗？')) {
      this.supplierName = $event.data.supplierName;
      this.purchaseOrder.supplierId = $event.data.id;
      this.purchaseGoods = [];
      this.service.getGoodsBySupplierId(this.purchaseOrder.supplierId).then((result: Result) => {
        if (result.success) {
          this.supplierGoods = result.data;
          this.supplierGoods.map((good: Goods) => {
            good['purchaseDiscount'] = 0;
            good['purchaseQuantity'] = 0;
            good['purchaseUnitPrice'] = good.goodsPrice;
            good['purchaseTotalAmount'] = 0;
            good['contractTotalAmount'] = 0;
          })
        } else {
          alert(result.message);
        }
      })
    }
  }

  /**
   * 供应商商品选择事件
   */
  onMultiPickerNotify($event) {
    if ($event.type == 'select_item') {
      this.purchaseGoods = $event.data;
      //重置已选商品id
      this.cachedSelectedGoodsIds.clear();
      this.purchaseGoods.map(data => {
        this.cachedSelectedGoodsIds.add(data.id);
      });
      //初始化供应商的所有商品
      this.supplierGoods.map(data => {
        if (this.cachedSelectedGoodsIds.has(data.id)) {
          data['selected'] = true;
        } else {
          delete data['selected'];
        }
      });
    }
    if ($event.type == 'clear_all') {
      this.purchaseGoods = [];
      //重置已选商品id
      this.cachedSelectedGoodsIds.clear();
      //初始化供应商的所有商品
      this.supplierGoods.map(data => {
        delete data['selected'];
      });
    }
  }

  /**
   * 已选商品列表事件
   */
  onSelectedGoodsTableNotify($event) {
    switch ($event.type) {
      case 'delete':
        _.remove(this.seerTable.data, $event.data);
        this.purchaseGoods = this.seerTable.data;
        this.cachedSelectedGoodsIds.delete($event.data.id);
        break;
      case 'delete_all':
        $event.data.map(data => {
          _.remove(this.seerTable.data, data);
          this.cachedSelectedGoodsIds.delete($event.data.id);
        });
        this.purchaseGoods = this.seerTable.data;
        break;
      case 'onInputValueChanged':
        this.calcGoodsPrice($event.data, $event.key);
        break;
    }

    //订单金额
    let poAmount = 0;

    this.purchaseGoods.map(good => {
      good.goodsId = good.id;
      // pg.contractTotalAmount = good.contractTotalAmount;
      // pg.purchaseUnitPrice = good.purchaseUnitPrice;
      // pg.purchaseQuantity = good.purchaseQuantity;
      // pg.purchaseTotalAmount = good.purchaseTotalAmount;
      // pg.purchaseDiscount = good.purchaseDiscount;
      // this.purchaseGoods.push(pg);
      poAmount += +good.purchaseTotalAmount;
    });
    this.purchaseOrder.poTotalAmount = poAmount + '';
  }

  /**
   * 计算价格折扣
   */
  private calcGoodsPrice(good: PurchaseGoods, key: string) {
    let numberFieldsInGood = ['purchaseDiscount', 'purchaseUnitPrice', 'purchaseTotalAmount', 'purchaseQuantity', 'contractTotalAmount'];
    for (let field of numberFieldsInGood) {
      if (!good[field]) {
        good[field] = 0;
      }
    }
    switch (key) {
      case 'purchaseDiscount':
        good.purchaseUnitPrice = +(good['goodsPrice'] * (1 - good.purchaseDiscount / 100)).toFixed(4);
        break;
      case 'purchaseUnitPrice':
        good.purchaseDiscount = +((1 - +good.purchaseUnitPrice / good['goodsPrice']) * 100).toFixed(2);
        break;
      case 'purchaseQuantity':
        good.purchaseTotalAmount = good.purchaseUnitPrice * good.purchaseQuantity;
        break;
    }
    good.purchaseTotalAmount = +good.purchaseUnitPrice * good.purchaseQuantity;
    good.contractTotalAmount = +good['goodsPrice'] * good.purchaseQuantity;
    for (let field of numberFieldsInGood) {
      if (field != 'purchaseQuantity')
        good[field] = (+good[field]).toFixed(4);
    }
  }

  /**
   * 树选择事件
   */
  onTreePickerNotify($event) {
    if ($event.eventName == "onSelectCompleted") {
      if ($event.data.length > 0) {
        if ($event.data[0].data.customNodeType == 'org') {
          alert('请选择员工');
          return;
        }
        this.purchaseOrder.staffId = $event.data[0].id;
        this.selectedStaffName = $event.data[0].data.name;
      } else {
        this.purchaseOrder.staffId = undefined;
        this.selectedStaffName = undefined;
      }
    }
  }
}
