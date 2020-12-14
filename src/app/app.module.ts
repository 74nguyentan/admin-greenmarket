﻿import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { MatDialogModule } from '@angular/material/dialog';;
import { SuccessDialogComponent } from './dialog/success-dialog/success-dialog.component';
import { FailDialogComponent } from './dialog/fail-dialog/fail-dialog.component'
@NgModule({
  imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      AngularFirestoreModule,
      AngularFireAuthModule,
      MatDialogModule,
      FormsModule,
      AngularFireModule.initializeApp(environment.firebase)
  ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        SuccessDialogComponent,
        FailDialogComponent,
       ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
