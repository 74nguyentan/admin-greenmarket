import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import {Color, Label, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ThongkeService } from '@app/service/thongke.service';
import { Router } from '@angular/router';
import { thongke } from '@app/model/Thongke';

@Component({
  templateUrl: './thongKe.component.html',
  styleUrls: ['./thongKe.component.css']
})
export class thongKeComponent implements OnInit {
  thongke: Array<any> = [];
  constructor(private ThongkeService: ThongkeService, private route: Router) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  ngOnInit(): void {
    this.ThongkeService.getthongke().subscribe(data => {
      this.thongke = data;
      this.thongke = data.filter((value,i) => i <= 3);
      this.thongke = this.shuffle(this.thongke);

      console.log(data);
      // cot
      this.barChartData = [
        {data: this.thongke.map(dataChart => dataChart.soluong), label: 'Tổng số',
        backgroundColor: 'rgb(128, 214, 175)',
        borderWidth:1,
        borderColor:'#777',
        hoverBorderWidth:1,
        hoverBorderColor:'#000',
        hoverBackgroundColor:'rgb(69, 212, 148)',}
      ]

      this.barChartLabels = this.thongke.map(dataLabel => dataLabel.hoVaTen)
    });
  }

  barChartOptions: ChartOptions = {

    title: {
      text: 'Thống kê',
      fontSize: 20
    },

    responsive: true,
    scales: {
      yAxes: [{ticks: {fontSize: 18, fontFamily: "tahoma", fontColor: '#000', fontStyle: '500'}}],
      xAxes: [{ticks: {fontSize: 18, fontFamily: "tahoma", fontColor: '#000', fontStyle: '500'}}]
    },

  };

  // barChartLabels: Label[] = ['Nhật Bản', 'Hàn Quốc', 'Thái Lan', 'Việt Nam', 'Lào', 'Campuchia'];
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[];

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // tron
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Hàng Tàu'], ['Hàng Nhái'], 'Hàng Hết Hạn'];
  public pieChartData: SingleDataSet = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  // duong
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Tổng số' },
  ];

  lineChartLabels: Label[] = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];

  lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{ticks: {fontSize: 18, fontFamily: "tahoma", fontColor: '#000', fontStyle: '500'}}],
      xAxes: [{ticks: {fontSize: 18, fontFamily: "tahoma", fontColor: '#000', fontStyle: '500'}}]
    },
  };

  lineChartColors: Color[] = [
    {
      // borderColor: 'black',
      // backgroundColor: 'rgba(255,255,0,0.28)',
      backgroundColor: 'rgb(128, 214, 175)',
      borderWidth:1,
      borderColor:'#777',
      hoverBorderWidth:1,
      hoverBorderColor:'#000',
      hoverBackgroundColor:'rgb(69, 212, 148)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

}
