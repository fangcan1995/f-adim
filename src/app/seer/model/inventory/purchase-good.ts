export class PurchaseGoods {
  id: string = '';
  purchaseOrderId: string = '';
  goodsId: string = '';
  /** 实际到达数量 */
  realQuantity: number = 0;
  /** 采购数量 */
  purchaseQuantity: number = 0;
  /** 实际单价 */
  purchaseUnitPrice: number = 0;
  /** 商品折扣 百分比 */
  purchaseDiscount: number = 0;
  /** 采购总金额 */
  purchaseTotalAmount: number = 0;
  /** 合同总金额 */
  contractTotalAmount: number = 0;
}
