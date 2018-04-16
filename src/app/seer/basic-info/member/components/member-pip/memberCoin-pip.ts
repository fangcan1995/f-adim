import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'coinFormate'})
export class MemberCoinPip implements PipeTransform {

  transform(value:string):string {
      if(value !=null && value != undefined && value != ""){
        return parseFloat(value).toFixed(2);
      }else{
          return "0";
      }
  }
}
