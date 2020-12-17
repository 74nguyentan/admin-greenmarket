import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '@app/model/Product';
import { ProductService } from '@app/service/product.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  product : Products = new Products ;
  constructor(private productservice: ProductService, private route : Router) { }

  ngOnInit(): void {
    this.load_product();
  }

  load_product(){
    this.product = new Products;
    this.productservice.getreport().subscribe(data => {
      this.product = data;
      console.log(this.product);
    })
  }

  delete_product(id: number){
    this.productservice.deleteProduct(id).subscribe(data => {
     this.load_product();
    })
  }

  open_product(id : number){
  this.product = new Products();
  this.product.luotBaoCao = 0;
  console.log(this.product.luotBaoCao);
  this.productservice.opnereport(id, this.product)
    .subscribe(data => {
      this.load_product();
   });
  }
}
