import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  templateUrl: './thongKe.component.html',
  styleUrls: ['./thongKe.component.css']
})
export class thongKeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{ticks: {fontSize: 18, fontFamily: "tahoma", fontColor: '#000', fontStyle: '500'}}],
      xAxes: [{ticks: {fontSize: 18, fontFamily: "tahoma", fontColor: '#000', fontStyle: '500'}}]
    },

  };
  barChartLabels: Label[] = ['Nhật Bản', 'Hàn Quốc', 'Thái Lan', 'Việt Nam', 'Lào', 'Campuchia'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 27, 60, 70, 46, 33],
      label: 'Tổng số',
      backgroundColor: 'rgb(128, 214, 175)'
      // [
      //   'rgba(255, 99, 132, 0.6)',
      //   'rgba(54, 162, 235, 0.6)',
      //   'rgba(255, 206, 86, 0.6)',
      //   'rgba(75, 192, 192, 0.6)',
      //   'rgba(153, 102, 255, 0.6)',
      //   'rgba(255, 159, 64, 0.6)'
      // ]
      ,
      borderWidth:1,
      borderColor:'#777',
      hoverBorderWidth:1,
      hoverBorderColor:'#000',
      hoverBackgroundColor:'rgb(69, 212, 148)',

    }
  ];
}
