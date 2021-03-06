import {Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';

@Component({
  selector: 'seer-progress',
  styleUrls: ['./seer-progress.scss'],
  templateUrl: './seer-progress.html',

})
export class SeerProgressComponent implements OnInit {


  @Input() type:string;//支持两种类型node一种是当前页面的节点progress另一种进度
  @Input() contentList:any;
  @Input() currentNode:number;


  constructor() {
    //console.log('-----------------');
    //console.log(this.currentNode);
  }

  ngOnInit(): void {

  }
  ngOnChanges(){
    if(this.type === "node"){
      for (let index = 0; index < this.contentList.length; index++) {
        if(this.currentNode == index+1){
          this.contentList[index].showColor = true;
        }
        else {
          this.contentList[index].showColor = false;
        }
      }
    }else{
      for (let index = 0; index < this.contentList.length; index++) {
        if(this.currentNode >= index+1){
          this.contentList[index].showColor = true;
        }else {
          this.contentList[index].showColor = false;
        }
      }
    }
  }

}





