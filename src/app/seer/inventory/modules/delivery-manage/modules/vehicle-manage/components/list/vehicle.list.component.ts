import {Component} from "@angular/core";
import {carService} from "../../../../../../../basic_info/modules/car-manage/car-manage.service";
import {CAR_TRANSLATE} from"../../../../../../../basic_info/modules/car-manage/components/car.translate";
import {vehicleService} from "../../vehicle-manage.service";

@Component({
  selector: 'vehicle-manage-list',
  templateUrl: './vehicle.list.component.html',
  styleUrls: ['./vehicle.list.component.css'],
  providers: [carService, vehicleService],
})
export class VehicleListManageComponent {

  cars = [];
  currentCar;
  currentVehicle;
  car_translate = CAR_TRANSLATE;
  errorMessage;
  currentUser;
  filteredList;

  constructor(private carService: carService, private vehicleService: vehicleService) {
  }

  ngOnInit() {
    this.getCars();
    this.currentUser = JSON.parse(localStorage.getItem('data')).currentUser;
  }

  renderVehicleState(vehicleState) {
    let res;
    this.car_translate.vehicleState.forEach(function (o) {
      if (o.dictValueId == vehicleState) {
        res = o.dictValueName;
      }
    });
    return res;
  }

  cancel() {
    this.currentCar = null;
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars()
      .subscribe(
        res => {
          this.cars = res.data;
          this.filteredList = res.data;
        },
        error => this.errorMessage = <any>error);
  }
  currentStartTime;
  editVehicle(car) {
    this.currentCar = car;
    if (car.vehicleState == '02') {
      this.currentVehicle = {
        vehicleId: car.id,
        staffId: this.currentUser.staffId,
        driverName: this.currentUser.userName,
        orderIds: []
      }
    } else if (car.vehicleState == '01') {
      this.vehicleService.getVehicleByCarId(car.id)
        .subscribe(
          res => {
            this.currentVehicle = res.data;
          },
          error => this.errorMessage = <any>error);
    }
  }

  save() {
    console.log(this.currentVehicle);
    this.vehicleService.addVehicle(this.currentVehicle)
      .subscribe(
        res => {
          this.currentCar.vehicleState = '01';
          this.carService.updateCar(this.currentCar)
            .subscribe(
              res1 => {
                this.cancel();
              },
              error => this.errorMessage = <any>error);
        },
        error => this.errorMessage = <any>error);
  }

  applyDelivery() {
    if (confirm("确定交还车辆吗？")) {
      this.vehicleService.updateVehicle(this.currentVehicle)
        .subscribe(
          res => {
            this.currentCar.vehicleState = '02';
            this.carService.updateCar(this.currentCar)
              .subscribe(
                res1 => {
                  this.cancel();
                },
                error => this.errorMessage = <any>error);
          },
          error => this.errorMessage = <any>error);
    }

  }

  query = "";

  filter() {
    this.filteredList = this.cars.filter(function (el) {
      let result = el['vehicleNumber'];
      return result.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
    }.bind(this));


  }

}

