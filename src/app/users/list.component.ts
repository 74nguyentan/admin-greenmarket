// import { Observable } from 'rxjs';
import { UserServiceService } from './../service/user-service.service';
import { Users } from './../model/user';
import { Component, Inject, OnInit } from '@angular/core';
// import { Products } from '@app/model/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ComfimDialogComponent } from '@app/dialog/comfim-dialog/comfim-dialog.component';

@Component({ templateUrl: 'list.component.html', styleUrls: ['./list.component.css'] })
export class ListComponent implements OnInit {
  // user: Observable<Users[]>;
  user: Users = new Users();
  // user : any;
  constructor(
    private userServiceService: UserServiceService,
    private router: Router,
    @Inject(MatDialog) public data: any,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.user = new Users();
    this.userServiceService.getUsList().subscribe(data => {
      console.log("data --- " + data);
      this.user = data;
    },
      error => console.log("error user > :" + error)
    )
  }

  deleteUser(id: any) {
    const confirmDialog = this.dialog.open(ComfimDialogComponent, {
      data: {
        title: 'Bạn có muốn xóa ?',
        mesage: 'bạn cần làm lại ... !',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      console.log("resultttt --- " + result);

      if (result === true) {
        this.userServiceService.deleteUser(id)
          .subscribe(
            data => {
              console.log("data>>>> " + data);
              this.loadUser();
            },
            error => console.log(error));
      }
    });
  }
  onKey(hoVaten: any) { // without type info
    if (hoVaten == null || hoVaten == '') {
      this.loadUser();
    }
    else {
      this.findbyHoTen(hoVaten);
    }

  }
  findbyHoTen(hoVaTen: any) {
    this.user = new Users();
    this.userServiceService.getFindUser(hoVaTen)
      .subscribe(
        data => {
          this.user = data;
          console.log(data);
        },
        error => console.log(error));
  }
  Update(id: number) {
    this.router.navigate(['edit', id]);
  }
}

