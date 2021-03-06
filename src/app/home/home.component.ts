﻿import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { Color, Label, MultiDataSet, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { ThongkeService } from '@app/service/thongke.service';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html',styleUrls: ['./home.component.css'] })
export class HomeComponent {
    user: User;

    constructor(private accountService: AccountService,private ThongkeService: ThongkeService, private route: Router) {
        this.user = this.accountService.userValue;
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
    }

    // fronend

  doughnutChartLabels: Label[] = ['Đồ gia dụng', 'Thể thao', 'Điện thoại'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';
    // fronend
    thongke: Array<any> = [];
    thongke1: Array<any> = [];
    thongke2: Array<any> = [];

    ngOnInit(): void {
      this.ThongkeService.getthongke().subscribe(data => {
        this.thongke = data;
        this.thongke = data.filter((value,i) => i <= 10);
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

      this.ThongkeService.getthongkelichsu().subscribe(tkls =>{
        this.thongke1 = tkls;
        this.thongke1 = tkls.filter((value,i) => i <= 5);
        this.thongke1 = this.shuffle(this.thongke1);

        this.pieChartLabels = this.thongke1.map(tklsLable => tklsLable.tenHang)

        this.pieChartData = this.thongke1.map(tklschart => tklschart.soluongmathang)
      });

      this.ThongkeService.getthongkeyeuthich().subscribe(tkyt =>{
        this.thongke2 = tkyt;
        this.thongke2 = tkyt.filter((value,i) => i <= 10);
        this.thongke2 = this.shuffle(this.thongke2);
        console.log(this.thongke2);

        this.lineChartData = [
          {data: this.thongke2.map(tkytChart => tkytChart.soluongyeuthich), label: 'Tổng số'}]

        this.lineChartLabels = this.thongke2.map(tkytLable => tkytLable.ten_hang);
      });
    }

    barChartOptions: ChartOptions = {

      title: {
        text: 'Thống kê',
        fontSize: 20
      },

      responsive: true,
      scales: {
        yAxes: [{ticks: {fontSize: 12, fontFamily: "tahoma", fontColor: '#000', fontStyle: '500', beginAtZero: true}}],
        xAxes: [{ticks: {fontSize: 12, fontFamily: "tahoma", fontColor: '#000', fontStyle: '500'}}]
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
    // public pieChartLabels: Label[] = [['Hàng Tàu'], ['Hàng Nhái'], 'Hàng Hết Hạn'];
    public pieChartLabels: Label[] ;
    public pieChartData: SingleDataSet [];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];


    // duong
    lineChartData: ChartDataSets[];

    lineChartLabels: Label[];

    lineChartOptions = {
      responsive: true,
      scales: {
        yAxes: [{ticks: {fontSize: 12, fontFamily: "tahoma", fontColor: '#000', fontStyle: '500',stepSize: 1}}],
        xAxes: [{ticks: {fontSize: 12, fontFamily: "tahoma", fontColor: '#000', fontStyle: '500'}}]
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
