import {Component} from '@angular/core';

@Component({
  selector: 'staff-home-analysis',
  templateUrl: './staff-home-analysis.component.html',
  styleUrls: ['./staff-home-analysis.component.css'],
  providers: [],
})
export class StaffAnalysisHomeComponent {
  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
   // console.log(e);
  }
}

