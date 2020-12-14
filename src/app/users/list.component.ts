import { Observable } from 'rxjs';
import { UserServiceService } from './../service/user-service.service';
import { Users } from './../model/user';
import { Component, OnInit } from '@angular/core';
import { Products } from '@app/model/Product';

@Component({ templateUrl: 'list.component.html', styleUrls: ['./list.component.css'] })
export class ListComponent implements OnInit {
  // user: Observable<Users[]>;
user : Users = new Users();
  // user : any;
  constructor(
    private userServiceService: UserServiceService,
  ) { }

  ngOnInit(): void  {
    this.user = new Users();
    this.userServiceService.getUsList().subscribe(data => {
      console.log("data --- " + data);

      this.user = data;
    },
      error => console.log("error user > :" + error)
    )


// this.user = [
//   {
//     hoVaTen: "Nguyen Van Tan",
//     email: "exfick@gmail.com",
//     dienThoai: "0325772929",
//     diaChiUser:"Quang Tri",
//     vaiTro: true
//   },
//   {
//     hoVaTen: "Nguyen Ba Tuong",
//     email: "tuongnb@gmail.com",
//     dienThoai: "0968225335",
//     diaChiUser:"Ha Tinh",
//     vaiTro: true
//   },
//   {
//     hoVaTen: "Le Van Luu",
//     email: "lvLuu@gmail.com",
//     dienThoai: "0362515808",
//     diaChiUser:"Quang Tri",
//     vaiTro: true
//   },
//   {
//     hoVaTen: "Phan Van duong",
//     email: "lduong@gmail.com",
//     dienThoai: "0792656784",
//     diaChiUser:"Ha Tinh",
//     vaiTro: true
//   },
//   {
//     hoVaTen: "Tran Manh Dung",
//     email: "dubgtm@gmail.com",
//     dienThoai: "0968665325",
//     diaChiUser:"Quang Binh",
//     vaiTro: true
//   }
// ]
  }

  deleteUser(id: string) {

  }
}

