import { inforRoutingModule } from './myInformation-routing.module';
import { inforComponent } from './infor.component';
import { MyInformationComponent } from './my-information.component';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [MyInformationComponent, inforComponent],
  imports: [
    CommonModule,
    inforRoutingModule
  ]
})

export class myInformation { }
