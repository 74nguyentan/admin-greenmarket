import { Observable } from 'rxjs';
import { UserServiceService } from './../service/user-service.service';
import { Users } from './../model/user';
import { Component, OnInit } from '@angular/core';

@Component({ templateUrl: 'list.component.html', styleUrls: ['./list.component.css'] })
export class ListComponent implements OnInit {
  users: Users
  // users: Observable<Users[]>;

  constructor(
    private userServiceService: UserServiceService
  ) { }

  ngOnInit(): void  {
    this.users = new Users();
    this.userServiceService.getUserList().subscribe(data => {
      console.log("data --- " + data);

      this.users = data;
    },
      error => console.log("error:" + error)
    )

    // this.users = this.userServiceService.getUserList();
    // console.log("userr: " + this.users);

  }

  deleteUser(id: string) {

  }
}
