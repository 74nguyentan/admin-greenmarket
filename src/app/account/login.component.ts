import { FailDialogComponent } from './../dialog/fail-dialog/fail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserServiceService } from './../service/user-service.service';
import { Users } from './../model/user';
import { AuthService } from './../service/auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    users: Users;

    constructor(
      @Inject(MatDialog) public data: any,
      private dialog: MatDialog,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private AuthService: AuthService,
        private UserServiceService: UserServiceService
    ) { }

    ngOnInit() {
        this.users = new Users();
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        this.UserServiceService.getUserByEmail(this.f.username.value).subscribe(data =>{
          this.users = Object.assign({}, ...data);
          console.log("---email----->> " + this.users.email);
          console.log("---vai tro----->> " + this.users.vaiTro);

          if(this.users.vaiTro == true){

             this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                   this.AuthService.SignIn(this.f.username.value, this.f.password.value);
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
          }
          else{
            this.loading = false;
            const confirmDialog = this.dialog.open(FailDialogComponent, {
              data: {
                title: 'Thất bại !',
                message: 'Vui lòng nhập đúng thông tin và thử lại !',
              },
            });
          }

        },
        error =>{
          console.log(error)
        }
        )


    }
}
