import {Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {Http} from "@angular/http";
import {IMultiSelectOption} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {BaseService} from "../../base.service";


@Component({
  selector: 'selecttable',
  styleUrls: ['./select.table.css'],
  templateUrl: './select.table.html',

})
export class selectTableComponent implements OnInit {


  @Input() data;
  @Input() titles;
  @Input() titleOption;
  @Input() translate;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  public sortBy;


  public filterQuery = "";
  public rowsOnPage = 10;
  public sortOrder = '';
  public select = {};
  public titlesCopy = [];
  private selectedOptions = [];


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







  single_select(event): void {
    delete event.selected;

    let translate_copy = this.translate;
    if(translate_copy){
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

    this.notify.emit({type: 'select', data: event});
  }




  query = "";
  filteredList;

  getData() {
    if (this.query !== "") {
      return this.filteredList;
    } else {
      let translate_copy = this.translate;
      if(translate_copy){
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


}



