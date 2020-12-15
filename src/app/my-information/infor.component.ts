import { Users } from './../model/user';
import { UserServiceService } from './../service/user-service.service';
import { AuthService } from './../service/auth.service';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '@app/dialog/success-dialog/success-dialog.component';
import { FailDialogComponent } from '@app/dialog/fail-dialog/fail-dialog.component';

@Component({
  templateUrl: './infor.component.html',
  styleUrls: ['./infor.component.css']
})
export class inforComponent implements OnInit {
  isShowFormUser = false;
  users: Users
  id : any

  constructor(
    @Inject(MatDialog) public data: any,
    private dialog: MatDialog,
    private AuthService: AuthService,
    private UserServiceService: UserServiceService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.users = new Users();
    this.id = this.AuthService.user_id();

    this.UserServiceService.getUserById(this.id).subscribe(data =>{
      this.users = data
    },
    error => console.log("error in4 :> " + error)
    )
  }
  Update(){
    this.UserServiceService.updateUser(this.users.id, this.users).subscribe(
      data => {
        console.log(data);
        this.ngOnInit();
        this.isShowFormUser = false;

        const confirmDialog = this.dialog.open(SuccessDialogComponent, {
          data: {
            title: 'Thành Công !',
          },
        });
      },
      error => {
        console.log("error update user ---------> "+error);
        const confirmDialog = this.dialog.open(FailDialogComponent, {
          data: {
            title: 'Thất bại !',
          },
        });
      }
    );
  }
}
