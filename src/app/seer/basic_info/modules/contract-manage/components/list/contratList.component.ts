import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {contractService} from "../../contrat-manage.service";
import {CONTRACT_TRANSLATE} from "../contract.translate"
@Component({
  selector: 'contractListComponent',
  templateUrl: './contratListComponent.html',
  styleUrls: ['./contratListComponent.css'],
  providers: [],

})
export class contractListComponent{
  translate = CONTRACT_TRANSLATE;
  search = {
    startDate: '',
    endDate: '',
    contractType: ''
  };
  currentcontract;
  errorMessage;
  data = [];
  titles = [
    {
      key: 'contractNumber',
      label: '合同编号',
    },
    {
      key: 'contractName',
      label: '合同名称',
    },
    {
      key: 'contractType',
      label: '合同类型',
    },
    {
      key: 'startDate',
      label: '有效期起',
    },
    {
      key: 'endDate',
      label: '有效期止',
    },
    {
      key: 'signDate',
      label: '签订时间',
    },
    {
      key: 'signPerson',
      label: '签订人',
    },
  ];

  constructor(private contractService: contractService) {
  }

  ngOnInit() {
    this.getcontracts();
  }



  getcontracts(): void {
    this.contractService.getcontracts()
      .subscribe(
        res => {
          this.data = res.data;
        },
        error => this.errorMessage = <any>error);
  }


  cancel(): void {
    this.currentcontract = null;
    this.search = {
      startDate: '',
      endDate: '',
      contractType: ''
    };
    this.getcontracts();
  }


  diaplayList(message): void {
    if (message == 'diaplay_list') {
      this.cancel();
    }
  }

  searchByDate(): void {
    this.contractService.searchContract(this.search)
      .subscribe(
        res => {
          this.data = res.data;
        },
        error => this.errorMessage = <any>error);
  }




  onChange(message): void {
    console.log(message)
    if (message.type == 'add') {
      this.currentcontract = {};
    }
    if (message.type == 'update') {

      this.currentcontract = message.data;
      if (message.data.startDate) {
        let s = new Date(message.data.startDate);
        message.data.startDate = s.getFullYear() + "-" + (s.getMonth() + 1) + "-" + s.getDate();
      }
      if (message.data.endDate) {
        let d = new Date(message.data.endDate);
        message.data.endDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      }

      if (message.data.signDate) {
        let d = new Date(message.data.signDate);
        message.data.signDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      }

    }
    if (message.type == 'delete') {
      this.contractService.removecontract(message.data.id)
        .subscribe(
          res => {
            this.getcontracts();
          },
          error => this.errorMessage = <any>error);
    }
    if (message.type == 'delete_all') {
      let ids = [];
      message.data.forEach(function (item) {
        ids.push(item.id)
      });
      this.contractService.removeAllSelectedcontracts(ids.toString())
        .subscribe(
          res => {
            this.getcontracts();
          },
          error => this.errorMessage = <any>error);

    }
  }

}

