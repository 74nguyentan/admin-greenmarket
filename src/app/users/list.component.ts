// import { Observable } from 'rxjs';
import { UserServiceService } from './../service/user-service.service';
import { Users } from './../model/user';
import { Component, OnInit } from '@angular/core';
// import { Products } from '@app/model/Product';
import { Router } from '@angular/router';

@Component({ templateUrl: 'list.component.html', styleUrls: ['./list.component.css'] })
export class ListComponent implements OnInit {
  // user: Observable<Users[]>;
  user: Users = new Users();
  // user : any;
  constructor(
    private userServiceService: UserServiceService,
    private router: Router
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
  deleteUser(id: string) {

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

