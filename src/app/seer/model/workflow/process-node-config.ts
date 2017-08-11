import {BaseEntity} from "../BaseEntity";
export class ProcessNodeConfig extends BaseEntity{
  id?:string = '';
  processKey?:string = '';
  nodeName?:string = '';
  nodeSort?:string = '0';
  nodeRoles?:string[] = [];
}

export class ProcessNodeConfigDTO{
  processKey?:string = '';
  configList?:ProcessNodeConfig[] = []
}
