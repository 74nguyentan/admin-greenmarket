import { thongKeRoutingModule } from './thongKe-routing.module';
import { thongKeComponent } from './thongKe.component';
import { layoutThongKeComponent } from './layout-thongKe.component';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [layoutThongKeComponent, thongKeComponent],
  imports: [
    CommonModule,
    thongKeRoutingModule  ]
})

export class thongKeModule { }
