import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { Color, Label,MultiDataSet } from 'ng2-charts';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html',styleUrls: ['./home.component.css'] })
export class HomeComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }

    // fronend
    lineChartData: ChartDataSets[] = [
      { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
    ];

    lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

    lineChartOptions = {
      responsive: true,
    };

    lineChartColors: Color[] = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,255,0,0.28)',
      },
    ];

    lineChartLegend = true;
    lineChartPlugins = [];
    lineChartType = 'line';

    barChartOptions: ChartOptions = {
      responsive: true,
    };
    barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
    barChartType: ChartType = 'bar';
    barChartLegend = true;
    barChartPlugins = [];

    barChartData: ChartDataSets[] = [
      { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
    ];

    doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Punctuality', 'Communication', 'Problem Solving',
    'Team Player', 'Coding', 'Technical Knowledge', 'Meeting Deadlines'];

  public radarChartData: ChartDataSets[] = [
    { data: [0, 1, 2, 3, 4, 5, 6], label: 'Employee Skill Analysis' }
  ];
  public radarChartType: ChartType = 'radar';
    // fronend
}
