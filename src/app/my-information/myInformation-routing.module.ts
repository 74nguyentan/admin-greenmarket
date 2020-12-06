import { inforComponent } from './infor.component';
import { MyInformationComponent } from './my-information.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '', component: MyInformationComponent,
        children: [
            { path: '', component: inforComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class inforRoutingModule { }
