import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ThongkeService } from '@app/service/thongke.service';
import { Router } from '@angular/router';
import { thongke } from '@app/model/Thongke';

@Component({
  templateUrl: './thongKe.component.html',
  styleUrls: ['./thongKe.component.css']
})
export class thongKeComponent implements OnInit {
  thongke: Array<any> = [];
  constructor(private ThongkeService: ThongkeService, private route: Router) { }

  ngOnInit(): void {
    this.ThongkeService.getthongke().subscribe(data => {
      this.thongke = data;
      console.log(data);
      
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
}
