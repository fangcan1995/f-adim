
import {Component, Input, OnChanges, OnInit, TemplateRef} from "@angular/core";

import {LoanBasicService} from "../../loan-basic.service";
import {UPDATE} from "../../../../common/seer-table/seer-table.actions";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'pwan-info',
  templateUrl: './pwan-info.component.html',
})
export class PwanInfoComponent implements OnInit,OnChanges {

  @Input()
  private disabled: boolean = false;

  @Input() projectId : string;

  @Input() memberId : string;

  @Input() vehicles = [];

  @Input() houses = [];

  @Input() pawn = {};

  public actions = [ UPDATE ];

  private vehicle ={};

  private house = {};

  constructor(private service: LoanBasicService, private modalService: BsModalService){}

  ngOnInit() {
    if(!this.disabled) { this.actions = [ UPDATE ]; }else {this.actions = []; }
  }

  ngOnChanges() {

  }

  private setVehicle($event, vehicle) {
    $event.preventDefault();
    this.service.pawnVehicle(vehicle.id, this.projectId).then(res => {
      if("0" == res.code) {
        this.pawn = vehicle;
        this.pawn['pawnType'] = "1";
      }else {
        console.log(res.message);
      }
    });
  }

  private setHouse($event, house) {
    $event.preventDefault();
    this.service.pawnHouse(house.id, this.projectId).then(res => {
      if("0" == res.code) {
        this.pawn = house;
        this.pawn['pawnType'] = "2";
      }else {
        console.log(res.message);
      }
    });
  }

  //弹出层
  public modalRef: BsModalRef;
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private vehicleReadOnly: boolean = true;
  public vehicleModal(template: TemplateRef<any>, vehicleReadOnly: boolean, vehicle?: any) {

    if(vehicleReadOnly) {
      this.vehicle = vehicle;
    }else {
      this.vehicle = {};
    }
    this.vehicleReadOnly = vehicleReadOnly;
    this.openModal(template);
  }

  private houseReadOnly: boolean = true;
  public houseModal(template: TemplateRef<any>,houseReadOnly, house?: any) {

    if(houseReadOnly) {
      this.house = house;
    }else {
      this.house = {};
    }
    this.houseReadOnly = houseReadOnly;
    this.openModal(template);
  }

  private saveVehicle(vehicle) {
    vehicle['memberId'] = this.memberId;
    this.service.addVehicle(this.memberId, vehicle).then(res =>{
      if(0 == res.code) {
        this.vehicles.push(vehicle);
        this.modalRef.hide();
      }else {
        console.log(res.message);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  private saveHouse(house) {
    house['memberId'] = this.memberId;
    this.service.addHouse(this.memberId, house).then(res =>{
      if(0 == res.code) {
        this.houses.push(house);
        this.modalRef.hide();
      }else {
        console.log(res.message);
      }
    }).catch(error => {
      console.log(error);
    });
  }
}
