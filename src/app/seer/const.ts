// export const SERVER = 'http://172.16.7.4:8020';
export const SERVER = 'http://172.16.1.234:8020';

export const CACHE_DURATION = 6000;
export const REQUEST_TIMEOUT = 3000;

export const FILTER_PROPERTY = {
    NORMAL:0x1,
    REFUND:0x2,
    PURCHASE:0x4,
    SALES:0x8,
    WAREHOUSE:0x10,
    IN:0x20,
    OUT:0x40,
    PAYMENT:0x80,
    ACTIVITY:0x100,
};

export const ORDER_STATE = {
  BEGIN_PROCESS:'-1',
  VOTING:'00',
  VOTE_PASS:'01',
  VOTE_FAIL:'02',
  CONFIRMED:'03',
  RESUBMIT:'04',
  ABANDONED:'05',
};

export const PROCESS = {

  processes: [
    {name: 'purchaseOrderCensor', type: '00', key: 'purchase-order-censor',filterProperty:FILTER_PROPERTY.PURCHASE|FILTER_PROPERTY.NORMAL},
    {name: 'purchaseRefundOrderCensor', type: '01', key: 'purchase-refund-order-censor',filterProperty:FILTER_PROPERTY.PURCHASE|FILTER_PROPERTY.REFUND},
    {name: 'salesOrderCensor', type: '02', key: 'sales-order-censor',filterProperty:FILTER_PROPERTY.SALES|FILTER_PROPERTY.NORMAL},
    {name: 'salesRefundOrderCensor', type: '03', key: 'sales-refund-order-censor',filterProperty:FILTER_PROPERTY.SALES|FILTER_PROPERTY.REFUND},
    {name: 'inWarehouseCensor', type: '04', key: 'sales-refund-order-censor',filterProperty:FILTER_PROPERTY.WAREHOUSE|FILTER_PROPERTY.IN},
    {name: 'outWarehouseCensor', type: '05', key: 'sales-refund-order-censor',filterProperty:FILTER_PROPERTY.WAREHOUSE|FILTER_PROPERTY.OUT},
    {name: 'paymentCensor', type: '06', key: 'sales-refund-order-censor',filterProperty:FILTER_PROPERTY.PAYMENT},
    {name: 'activityCensor', type: '07', key: 'sales-refund-order-censor',filterProperty:FILTER_PROPERTY.ACTIVITY},
  ],


  convertTypeToKey:function (type: string) {
    let key = '';
    this.processes.forEach(process=>{
      if(process.type==type){
        key = process.key;
      }
    });
    return key;
  },

  filterProcess:function (filterProperty: number) {
    let process = this.processes.filter(process=>process.filterProperty==(process.filterProperty&filterProperty));
    if (process.length>1){
      throw new Error('过滤条件错误，过滤后应只有一种流程')
    }
    return process[0];
  }
};
