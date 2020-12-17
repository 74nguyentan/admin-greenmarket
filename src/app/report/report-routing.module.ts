import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListReportComponent } from './list-report';
import { ReportComponent } from './report.component';

const routes: Routes = [
    {
        path: '', component: ReportComponent,
        children: [
            { path: '', component: ListReportComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule { }
