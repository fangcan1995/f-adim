import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {companyService} from "../../company.manage.service";
@Component({
  selector: 'company-home-manage',
  templateUrl: './company.home.component.html',
  styleUrls: ['./company.home.component.css'],
  providers: [],
})
export class companyHomeManageComponent {

  company;
  amounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  errorMessage;

  constructor(private companyService: companyService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.companyService.getAll()
      .subscribe(
        res => {
          if (res.data && res.data.length) {
            this.company = res.data[0];
          }else{
            this.company = {
              companyNo: '',
              companyName: '',
              accountLimitation :2
            }
          }
        },
        error => this.errorMessage = <any>error);
  }

  save(){
    if(!this.company.id){
      this.companyService.addCompany(this.company)
        .subscribe(
          res => {
            this.getAll();
          },
          error => this.errorMessage = <any>error);
    }else{
      this.companyService.updateCompany(this.company)
        .subscribe(
          res => {
            this.getAll();
          },
          error => this.errorMessage = <any>error);
    }
  }


  renderAmountExemple() {
    let res = '';
    for (let i = 0; i < this.company.accountLimitation; i++) {
      res = res + '0';
    }
    return res;
  }


}
