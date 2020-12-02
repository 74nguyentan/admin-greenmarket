﻿import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', styleUrls: ['app.component.css'], templateUrl: 'app.component.html' })
export class AppComponent {
  user: User;
  // active = false;
  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.accountService.logout();
  }
  // activev(){
  //   this.active = false;
  //   this.active = true;
  // }
}
