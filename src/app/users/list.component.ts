import { Observable } from 'rxjs';
import { UserServiceService } from './../service/user-service.service';
import { Users } from './../model/user';
import { Component, OnInit } from '@angular/core';

@Component({ templateUrl: 'list.component.html', styleUrls: ['./list.component.css'] })
export class ListComponent implements OnInit {
  user: Users
  // user: Observable<Users[]>;

  constructor(
    private userServiceService: UserServiceService
  ) { }

  ngOnInit(): void  {
    this.user = new Users();
    this.userServiceService.getUserList().subscribe(data => {
      console.log("data --- " + data);

      this.user = data;
    },
      error => console.log("error:" + error)
    )

    // this.user = this.userServiceService.getUserList();
    // console.log("userr: " + this.user);

  }

  deleteUser(id: string) {

  }
}
