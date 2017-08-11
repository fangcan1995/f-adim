import {Component, ViewEncapsulation, OnInit , Input,Output,EventEmitter,OnChanges} from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'data_table',
  styles: [],
  templateUrl: './data_table.html',

})
export class dataTableComponent  implements OnInit ,OnChanges{

  @Input() data;
  @Input() settings;
  @Input() filter;
  @Input() perpage;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  source: LocalDataSource; // add a property to the component



  constructor() {
  }

  ngOnInit() {

    this.source = new LocalDataSource(this.data); // create the source

    if(!this.settings.mode){
      this.settings.mode = 'external';
    }
    //add
    if(!this.settings.actions){
      this.settings.actions = {
      };
    }

    this.settings.actions.add=false;
    //delete
    if(!this.settings.delete){
      this.settings.delete = {};
    }
    this.settings.delete.deleteButtonContent= '<div class="btn btn-danger btn-xs"><i class="ion-close-round"></i></div>';


    if(!this.settings.edit){
      this.settings.edit = {};
    }
    this.settings.edit.editButtonContent = '<div class="btn btn-info btn-xs"><i class="ion-edit"></i></div>';

    if(!this.settings.pager){
      this.settings.pager = {};
    }

    if(this.perpage){
      this.settings.pager.perPage = this.perpage;
    }else{
      this.settings.pager.perPage = 5;
    }


  }



  onSearch(query: string = ''): void {
    let atts = Object.keys(this.settings.columns);
    let filterArray = [];
    atts.forEach(function(att){
      filterArray.push({
        field: att,
        search: query
      })
    });
    this.source.setFilter(filterArray, false);
  }

  onDelete(event):void {
    let a=confirm("确定删除吗？");
    if(a){
      this.notify.emit({type:'delete',data:event.data});
    }
  }

  ngOnChanges(data) {
    if(this.data&&this.source){
      this.source.load(this.data)
    }
  }


  onEdit(event): void{
    this.notify.emit({type:'update',data:event.data});
  }
  add(): void{
    this.notify.emit({type:'add',data:{}});
  }




}



