import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { AuthService } from '@app/service/auth.service';
import { UserServiceService } from '@app/service/user-service.service';
import { Users } from '@app/model/user';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '@app/dialog/success-dialog/success-dialog.component';
import { FailDialogComponent } from '@app/dialog/fail-dialog/fail-dialog.component';

export function forbiddenUsername(users = []) {
  return (c: AbstractControl) => {
    return users.includes(c.value) ? { invalidusername: true } : null;
  };
}

export function comparePassword(c: AbstractControl) {
  const v = c.value;
  return v.matKhau === v.confirmPassword
    ? null
    : {
      passwordnotmatch: true,
    };
}

@Component({
  templateUrl: 'add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  imageUrLogin = 'https://drive.google.com/uc?export=download&id=1esCte0GllXVR0jiPEdH_yfEigX_9ThW-';
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  Users: Users;
  sdt = false;

  // check form cách 1: check trống và định dạng sdt và email
  get primEmail() {
    return this.check.get('email');
  }
  get phone() {
    return this.check.get('dienThoai');
  }
  check = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    dienThoai: new FormControl('', [
      Validators.required,
      Validators.pattern(/((09|03|07|08|05)+([0-9]{8})\b)/g),
    ]),
  });


  constructor(
    @Inject(MatDialog) public data: any,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private userService: UserServiceService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log("-id---------> " +this.id);

    this.isAddMode = !this.id;
    this.Users = new Users();
  if(this.id == null || this.id ==''){
    this.Users.hoVaTen = '';
    this.Users.diaChiUser = '';
    this.Users.matKhau = '';
  }
  else{
    this.userService.getUserById(this.id).subscribe((data)=>  {
      this.Users = data;
    },
    (error) => console.log(error)
    )
  }
    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    // this.form = this.formBuilder.group({
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   username: ['', Validators.required],
    //   password: ['', passwordValidators]
    // });

    // if (!this.isAddMode) {
    //   this.accountService.getById(this.id)
    //     .pipe(first())
    //     .subscribe(x => this.form.patchValue(x));
    // }

     // check form cách 2: check trống và kiểm tra trùng password
     this.form = this.fb.group({
      hoVaTen: ['',[Validators.required, forbiddenUsername(['', 'admin', 'manager'])],],
      diaChiUser: ['',[Validators.required, forbiddenUsername([''])],],
      // dienThoai: ['',[Validators.required, forbiddenUsername([''])],],
      // email: ['',[Validators.required, forbiddenUsername([''])],],
      pw: this.fb.group(
        {
          matKhau: ['', [Validators.required, forbiddenUsername([''])]],
          confirmPassword: ['', [Validators.required, forbiddenUsername([''])]],
        },
        {
          validator: comparePassword,
        }
      ),
    });
  }

  saveOrUpdate() {

      if (this.Users.matKhau === this.Users.xacNhanMatKhau) {
        var emailTest = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (emailTest.test(this.Users.email) == true) {
          var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
          if (vnf_regex.test(this.Users.dienThoai) == true) {
            this.Users.vaiTro = true;
            console.log("userrr ----- " + this.Users);

            this.userService.createUser(this.Users).subscribe(
              (data) => {
                console.log(data);
                this.authService.SignUp(this.Users.email, this.Users.matKhau);
                this.Users = new Users();
                this.router.navigate(['users']);
                const confirmDialog = this.dialog.open(SuccessDialogComponent, {
                  data: {
                    title: 'Thành Công !',
                    message:'Một email chứa mã xác nhận đã được gửi tới bạn'
                  },
                });
              },
              (error) => {
                console.log('error ----> : ' + error);
                const confirmDialog = this.dialog.open(FailDialogComponent, {
                  data: {
                    title: 'Thất bại !',
                    message: 'Vui lòng nhập đúng thông tin và thử lại !',
                  },
                });
              }
            );
          } else {
            console.log("----erro sdt");
            this.sdt = true;
            const confirmDialog = this.dialog.open(FailDialogComponent, {
              data: {
                title: 'Thất bại !',
                message: 'Số điện thoại của bạn không đúng !',
              },
            });
          }
        } else {
          this.sdt = true;
          console.log("----erro email");
          const confirmDialog = this.dialog.open(FailDialogComponent, {
            data: {
              title: 'Thất bại !',
              message: 'Nhập đúng định dạng email !',
            },
          });
        }
      } else {
        this.sdt = true;
        console.log("----erro mk");

        const confirmDialog = this.dialog.open(FailDialogComponent, {
          data: {
            title: 'Thất bại !',
            message: 'Nhập đúng mật khẩu !',
          },
        });
      }


  }

  onSubmit() {
    this.saveOrUpdate();
  }


  // convenience getter for easy access to form fields
  // get f() { return this.form.controls; }

  // onSubmit() {
  //     this.submitted = true;

  //     // reset alerts on submit
  //     this.alertService.clear();

  //     // stop here if form is invalid
  //     if (this.form.invalid) {
  //         return;
  //     }

  //     this.loading = true;
  //     if (this.isAddMode) {
  //         this.createUser();
  //     } else {
  //         this.updateUser();
  //     }
  // }

  // private createUser() {
  //     this.accountService.register(this.form.value)
  //         .pipe(first())
  //         .subscribe({
  //             next: () => {
  //                 this.alertService.success('User added successfully', { keepAfterRouteChange: true });
  //                 this.router.navigate(['../'], { relativeTo: this.route });
  //             },
  //             error: error => {
  //                 this.alertService.error(error);
  //                 this.loading = false;
  //             }
  //         });
  // }

  // private updateUser() {
  //     this.accountService.update(this.id, this.form.value)
  //         .pipe(first())
  //         .subscribe({
  //             next: () => {
  //                 this.alertService.success('Update successful', { keepAfterRouteChange: true });
  //                 this.router.navigate(['../../'], { relativeTo: this.route });
  //             },
  //             error: error => {
  //                 this.alertService.error(error);
  //                 this.loading = false;
  //             }
  //         });
  // }

}
