import {Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {Http} from "@angular/http";
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {BaseService} from "../../base.service";


@Component({
  selector: 'seertotaltable',
  styleUrls: ['./seer.total.table.css'],
  templateUrl: './seer.total.table.html',

})
export class seerTotalTableComponent implements OnInit {


  @Input() data;
  @Input() titles;
  @Input() titleOption;
  @Input() translate;
  @Input() hideColonnes;
  @Input() hideRemoveAll;
  @Input() showSelectButton;
  @Input() selectButtonText;
  @Input() hideAddButton;
  @Input() hideActions;
  @Input() hideExport;
  @Input() hidePrint;
  @Input() hideRemoveButton;
  @Input() hideFilter;
  @Input() hideEditButton;
  @Input() displayDetailButton;
  @Input() totalText;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  public sortBy;


  public filterQuery = "";
  public rowsOnPage = 10;
  public sortOrder = '';
  public select = {};
  public titlesCopy = [];
  private selectedOptions = [];


  private myOptions: IMultiSelectOption[] = [];

  onInputValueChanged(item,key){
    this.notify.emit({type:'onInputValueChanged',data:item, key:key});
  }
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

  removeAll(): void {
    let a = confirm("确定删除吗？");
    if (a) {
      let list = [];
      this.data.forEach(function (item) {
        if (item.selected == true) {
          list.push(item);
        }
      });

      this.notify.emit({type: 'delete_all', data: list});
    }
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


  remove(event): void {
    let a = confirm("确定删除吗？");
    if (a) {
      this.notify.emit({type: 'delete', data: event});
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


  query = "";
  filteredList;

  getData() {
    if (this.query !== "") {
      return this.filteredList;
    } else {
      let translate_copy = this.translate;
      if (translate_copy) {
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

  openLink(event) {
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


  remderSelectButtonText() {
    if (!this.selectButtonText) {
      return '选择'
    } else {
      return this.selectButtonText;
    }
  }


  clickSingleSelect(item) {
    this.notify.emit({type: 'single_select', data: item});
  }


  renderTotalNumber() {

    let res;
    if (this.totalText) {
      res = this.totalText;
    }

    let data = this.getData();
    this.titles.forEach(function (title) {
      if (title.total == true) {
        let num = 0;
        data.forEach(function (item) {
          if (item[title.key]) {
            num = num + parseInt(item[title.key]);
          }
        });
        if(res){
          res = res + ' ' + title.label + ' ' + num;
        }else{
          res = title.label + ' ' + num;
        }

      }
    });
    return res;
  }

}



