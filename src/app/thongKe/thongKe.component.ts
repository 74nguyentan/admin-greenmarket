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
      this.thongke = data.filter((value,i) => i <= 3);
      this.thongke = this.shuffle(this.thongke);

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
}
