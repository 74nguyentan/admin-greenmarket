import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ComfimDialogComponent } from '@app/dialog/comfim-dialog/comfim-dialog.component';
import { Products } from '@app/model/Product';
import { ProductService } from '@app/service/product.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  product: Products = new Products;
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
    this.productservice.getreport().subscribe(data => {
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
            error => console.log(error));
      }
    });
  }

  open_product(id: number) {

    const confirmDialog = this.dialog.open(ComfimDialogComponent, {
      data: {
        title: 'Bạn có muốn xóa ?',
        mesage: 'bạn cân làm lại ... !',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      console.log("resultttt --- " + result);

      if (result === true) {

        this.product = new Products();
        this.product.luotBaoCao = 0;
        console.log(this.product.luotBaoCao);
        this.productservice.opnereport(id, this.product)
          .subscribe(data => {
            this.load_product();
          });
      }
    });

  }
}
