import { thongKeComponent } from './thongKe.component';
import { layoutThongKeComponent } from './layout-thongKe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '', component: layoutThongKeComponent,
        children: [
            { path: '', component: thongKeComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class thongKeRoutingModule { }
