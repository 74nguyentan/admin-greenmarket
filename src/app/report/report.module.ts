

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListReportComponent } from './list-report';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';



@NgModule({
  declarations: [ReportComponent, ListReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})

export class ReportModule { }
