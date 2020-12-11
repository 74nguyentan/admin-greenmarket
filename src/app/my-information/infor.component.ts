import { Users } from './../model/user';
import { UserServiceService } from './../service/user-service.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './infor.component.html',
  styleUrls: ['./infor.component.css']
})
export class inforComponent implements OnInit {
  isShowFormUser = false;
  users: Users
  id : any

  constructor(
    private AuthService: AuthService,
    private UserServiceService: UserServiceService
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

}
