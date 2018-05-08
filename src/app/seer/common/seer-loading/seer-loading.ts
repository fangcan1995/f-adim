import {Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild} from '@angular/core';


@Component({
  selector: 'seer-loading',
  styleUrls: ['./seer-loading.css'],
  templateUrl: './seer-loading.html',

})
export class SeerLoadingComponent implements OnInit {


  @Input() type:string;
  @Input() isLoading:boolean;


  constructor() {
  }

  ngOnInit(): void {

  }

}





