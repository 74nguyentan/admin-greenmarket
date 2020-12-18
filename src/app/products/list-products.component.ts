import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '@app/service/product.service';
import { Products } from '@app/model/Product';

import { ComfimDialogComponent } from '@app/dialog/comfim-dialog/comfim-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FailDialogComponent } from '@app/dialog/fail-dialog/fail-dialog.component';

@Component({
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  product: Products = new Products;
  p: number;

  onKey(tenHang: any) { // without type info
    this.findbyname(tenHang);
  }

  constructor(
    private productservice: ProductService,
    @Inject(MatDialog) public data: any,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.load_product();
  }

  load_product() {
    this.product = new Products;
    this.productservice.getProductList().subscribe(data => {
      this.product = data;
      console.log(this.product);
    })
  }

  // delete_product(id: number){
  //   this.productservice.deleteProduct(id).subscribe(data => {
  //    this.load_product();
  //   })
  // }

  delete_product(id: number) {
    const confirmDialog = this.dialog.open(ComfimDialogComponent, {
      data: {
        title: 'Bạn có muốn xóa ?',
        mesage: 'bạn cân làm lại ... !',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      console.log("resultttt --- " + result);

      if (result === true) {
        this.productservice.deleteProduct(id)
          .subscribe(
            data => {
              console.log("data>>>> " + data);
              this.load_product();
            },
            error => {
              console.log("error update user ---------> "+error);
              const confirmDialog = this.dialog.open(FailDialogComponent, {
                data: {
                  title: 'Thất bại !',
                },
              });
            })
      }
    });
  }

  // delete_product(id: number) {
  //   const confirmDialog = this.dialog.open(ComfimDialogComponent, {
  //     data: {
  //       title: 'Bạn có muốn xóa ?',
  //       mesage: 'bạn cân làm lại ... !',
  //     },
  //   });
  //   confirmDialog.afterClosed().subscribe((result) => {
  //     if (result === true) {
  //       this.productservice.deleteProduct(id)
  //         .subscribe(
  //           data => {
  //             this.load_product();
  //           },
  //           error => console.log(error));
  //     }
  //   });

  // }

  findbyname(tenHang: any) {
    this.product = new Products();
    this.productservice.getProduct1(tenHang)
      .subscribe(
        data => {
          this.product = data;
          console.log(data);
        },
        error => {
          console.log("error update user ---------> "+error);
          const confirmDialog = this.dialog.open(FailDialogComponent, {
            data: {
              title: 'Thất bại !',
            },
          });
        });
  }
}
