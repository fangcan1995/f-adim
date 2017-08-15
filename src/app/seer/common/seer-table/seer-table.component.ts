import {Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {Http} from "@angular/http";
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {BaseService} from "../../base.service";


@Component({
  selector: 'seer-table',
  templateUrl: './seer-table.component.html',
  styleUrls: ['./seer-table.component.scss'],
  
  providers: [BaseService]
})
export class SeerTableComponent implements OnInit {
  @Input() data;   //数据数组
  @Input() titles;  //标题数组
  @Input() titleOption; //可选标题数组
  @Input() translate; //翻译JSON
  @Input() hideColonnes; //隐藏动态列
  @Input() hideRemoveAll; //隐藏全部删除按钮
  @Input() showSelectButton;//显示选择按钮
  @Input() selectButtonText;//选择按钮文字
  @Input() hideAddButton;//隐藏新增按钮
  @Input() hideActions;//隐藏事件列
  @Input() hideExport;//隐藏导出
  @Input() hidePrint;//隐藏打印
  @Input() hideRemoveButton; //隐藏删除按钮
  @Input() hideFilter;//隐藏全局过滤
  @Input() hideEditButton;//隐藏编辑按钮
  @Input() displayDetailButton;//显示详情按钮
  @Input() displayCopyButton;//显示复制新增按钮
  @Input() displayOriginalData;//翻译不破坏原始数据，但全局搜索不好使
  @Input() addNewButton; //新增自定义按钮
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  public sortBy;


  public filterQuery = "";
  public rowsOnPage = 10;
  public sortOrder = '';
  public select = {};
  public titlesCopy = [];
  private selectedOptions = [];
  public action;
  public alert_content='';
  public alert_id;

  private myOptions: IMultiSelectOption[] = [];


  constructor(private http: Http,private service:BaseService<any>) {
  }

  ngOnInit(): void {
    if (!this.titleOption) {
      this.titleOption = this.titles;
    }
    this.titlesCopy = Object.assign([], this.titleOption);
    if (this.titles && this.titles.length) {
      this.sortOrder = this.titles[0].key;
      let mulitiColloneArray = [];
      let mulitiColloneOptions = [];
      this.titles.forEach(function (title) {
        mulitiColloneOptions.push(title.key);
      });
      this.titleOption.forEach(function (title) {
        mulitiColloneArray.push({id: title.key, name: title.label});
      });
      this.myOptions = mulitiColloneArray;
      this.selectedOptions = mulitiColloneOptions;
    }
    this.select = {
      all: false,
      items: {}
    };
    /** 增加的部分 */
    if(!this.translate){
      let transFields:{field: string,dictKeyId?: string}[] = [];
      this.titleOption.map(title=>{
        if(title.isDict) {
          transFields.push({field:title.key,dictKeyId:title.dictKeyId});
        }
      });
      this.service.getDictTranslate(transFields).then(result=>{
        if(result.success){
          this.translate = result.data;
        }
      });
    }
    /** 增加的部分 */
  }

  selectAll(value): void {
    value = !value;

    this.data.forEach(function (item) {

      item.selected = value;
    });

  }
  currentDeleteEvents = [];
  removeAll(): void {
 /*   let a = confirm("确定删除吗？");
    if (a) {

    }*/
    let list = [];
    this.data.forEach(function (item) {
      if (item.selected == true) {
        list.push(item);
      }
    });

    this.alert_id = 'delete_all';
    this.alert_content = '确定删除吗?';
    this.action = 'show';
    this.currentDeleteEvents = list;
  }


  selectItem(): void {

    let list = [];
    this.data.forEach(function (item) {
      if (item.selected == true) {
        list.push(item);
      }
    });

    this.notify.emit({type: 'select_item', data: list});

  }

  renderSelectedNb() {
    let res = 0;
    this.data.forEach(function (item) {
      if (item.selected == true) {
        res++;
      }
    });
    return res;
  }

  public sortByWordLength = (a: any) => {
    return a.city.length;
  };

  currentDeleteEvent;
  remove(event): void {
  /*  let a = confirm("确定删除吗？");
    if (a) {
      this.notify.emit({type: 'delete', data: event});
    }*/
    this.alert_id = 'delete';
    this.alert_content = '确定删除吗?';
    this.action = 'show';
    this.currentDeleteEvent = event;

  }

  onSelectAlert(event){
    //console.log(event);
    if(event.type=='save'){
      if(this.alert_id == 'delete_all'){
        this.notify.emit({type: 'delete_all', data: this.currentDeleteEvents});
      }else if(this.alert_id == 'delete'){
        this.notify.emit({type: 'delete', data: this.currentDeleteEvent});
      }
      this.action = false;
    }else if(event.type=='cancel'){
      this.action = false;
    }
  }


  detail(event) {
    delete event.selected;
    let translate_copy = this.translate;
    if (translate_copy) {
      Object.keys(event).forEach(function (key) {
        if (translate_copy[key]) {
          translate_copy[key].forEach(function (o) {
            if (event[key] == o.dictValueName) {
              event[key] = o.dictValueId;
            }
          })
        }
      });
    }

    this.notify.emit({type: 'detail', data: event});
  }

  copyadd(event) {
    delete event.selected;
    let translate_copy = this.translate;
    if (translate_copy) {
      Object.keys(event).forEach(function (key) {
        if (translate_copy[key]) {
          translate_copy[key].forEach(function (o) {
            if (event[key] == o.dictValueName) {
              event[key] = o.dictValueId;
            }
          })
        }
      });
    }

    this.notify.emit({type: 'copy', data: event});
  }



  edit(event): void {

    delete event.selected;
    let translate_copy = this.translate;
    if (translate_copy) {
      Object.keys(event).forEach(function (key) {
        if (translate_copy[key]) {
          translate_copy[key].forEach(function (o) {
            if (event[key] == o.dictValueName) {
              event[key] = o.dictValueId;
            }
          })
        }
      });
    }

    this.notify.emit({type: 'update', data: event});
  }

  add(): void {
    this.notify.emit({type: 'add', data: {}});
  }



  //导入模板Excel
  exportTempExcel() : void {
    this.notify.emit({type: 'export', data: {}});

  }

  //导入Excel
  importExcel(): void {
    this.notify.emit({type: 'import', data: {}});
  }


  query = "";
  filteredList;

  getData() {
    if (this.query !== "") {
      return this.filteredList;
    } else {
      let translate_copy = this.translate;
      if (translate_copy&&!this.displayOriginalData) {
        this.data.forEach(function (item) {
          Object.keys(item).forEach(function (key) {
            if (translate_copy[key]) {
              translate_copy[key].forEach(function (o) {
                if (o.dictValueId == item[key]) {
                  item[key] = o.dictValueName;
                }
              })
            }
          })
        });
      }

      return this.data;
    }
  }

  filter() {
    this.filteredList = this.data.filter(function (el) {
      var result = "";
      for (var key in el) {
        result += el[key];
      }
      return result.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
    }.bind(this));

  }


  onChangeColonne(event): void {
    this.titles = [];
    let newTitles = [];

    this.titlesCopy.forEach(function (t) {
      event.forEach(function (e) {
        if (e == t.key) {
          newTitles.push(t);
        }
      });
    });
    this.titles = newTitles;
  }

  renderDate(value) {
    if (value) {
      let res;
      let d = new Date(value);
      res = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      return res;
    } else {
      return value;
    }
  }

  openLink(event){
    delete event.selected;

    let translate_copy = this.translate;
    if (translate_copy) {
      Object.keys(event).forEach(function (key) {
        if (translate_copy[key]) {
          translate_copy[key].forEach(function (o) {
            if (event[key] == o.dictValueName) {
              event[key] = o.dictValueId;
            }
          })
        }
      });
    }


    this.notify.emit({type: 'link', data: event});
  }


  clickAddNewButton(event){
    delete event.selected;

    let translate_copy = this.translate;
    if (translate_copy) {
      Object.keys(event).forEach(function (key) {
        if (translate_copy[key]) {
          translate_copy[key].forEach(function (o) {
            if (event[key] == o.dictValueName) {
              event[key] = o.dictValueId;
            }
          })
        }
      });
    }


    this.notify.emit({type: 'addNewButton', data: event});
  }

  remderSelectButtonText(){
    if(!this.selectButtonText){
      return '选择'
    }else{
      return this.selectButtonText;
    }
  }


  clickSingleSelect(item){
    this.notify.emit({type: 'single_select', data: item});
  }



  exportExcel(){

    console.log(this.getData());
    console.log(this.titles);

    let param = {
      "data": this.getData(),
      "titles": this.titles
    };

    //console.log(param);

    this.service.exportExcel(param).then(result=>{
      //console.log(result.json().data);
      this.download(result.json().data);
    });

  }

  download(data) {
    var a = document.createElement('a');
    var url = data;
    var filename = 'download.xls';
    a.href = url;
    a.download = filename;
    a.click();
  }





  renderValue(title,value){
    if(this.translate&&this.translate[title.key]){
      if(this.translate[title.key].length){
        this.translate[title.key].forEach(function(o){
          if(o.dictValueId==value){
            value = o.dictValueName;
          }
        })
      }
    }
    return value;
  }
}



