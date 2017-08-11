export class RepertoryListTableDto {

  //InvRepertory
  id: string;

  storageAreaId: string;//库位id

  goodsId: string;//商品id

  goodsNum: number;

  validityType: string;

  validityDate: Date;

  //BuzStorage
  storageName: string;

  storageAdress: string;

  storageBrandId: string;

  storageChannelId: string;

  storageType: string;

  storageState: string;

  //BuzStorageArea
  storageId: string;//库房id

  storageAreaName: string;

  storageQrCode: string;

  //BuzGoods
  goodsName: string;

  brandId: string;

  goodsType: string;

  goodsSeries: string;

  goodsNumber: string;

  goodsBarCode: string;

  goods2dCode: string;

  goodsUnits: string;

  boxRule: string;

  goodsVolume: string;

  goodsLength: string;

  goodsWidth: string;

  goodsHeight: string;

  goodsPacking: string;

  goodsWeight: string;

  goodsPhoto: string;

  goodsPrice: string;

  goodsRetailPrice: string;

  storeInfo: string[];

  extendField: string[];

  goodsState: string;

}
