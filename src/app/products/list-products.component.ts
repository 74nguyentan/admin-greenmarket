import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '@app/service/product.service';
import { Products } from '@app/model/Product';

@Component({
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  product : Products = new Products ;
  p: number;

  constructor(private productservice: ProductService, private route : Router) { }

  ngOnInit(): void {
    this.load_product();
  }

  load_product(){
    this.product = new Products;
    this.productservice.getProductList().subscribe(data => {
      this.product = data;
      console.log(this.product);
    })
  }

  delete_product(id: number){
    this.productservice.deleteProduct(id).subscribe(data => {
     this.load_product();
    })
  }
  // delete_product(id: number){
  //   const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
  //     data: {
  //       title: 'Bạn có muốn xóa ?',
  //       mesage: 'bạn cân làm lại ... !',
  //     },
  //   });
  //   confirmDialog.afterClosed().subscribe((result) => {
  //     if (result === true) {
  //  this.productservice.deleteProduct(id)
  //     .subscribe(
  //       data => {
  //         this.load_product();
  //       },
  //       error => console.log(error));
  //     }
  //   });

  // }
}
