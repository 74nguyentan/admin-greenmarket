import { auth } from 'firebase/app';
import { Users } from './../model/user';
import { UserServiceService } from './user-service.service';

import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    private UserServiceService: UserServiceService // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('admin', JSON.stringify(this.userData));
        let email_user = user.email;
        let userr;
        UserServiceService.getUserByEmail(email_user).subscribe(data => {
          userr = data;
          sessionStorage.setItem('userr', userr[0].id);
          JSON.parse(sessionStorage.getItem('userr'));
        });
      } else {
        localStorage.setItem('admin', null);
        JSON.parse(localStorage.getItem('admin'));
      }
    });
  }

  user_id() {
    return sessionStorage.getItem('userr');
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
          // console.log('auth islogin login ----------> : '+ this.isLoggedIn)
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        // window.alert(error.message)
      });
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        // window.alert(error.message)
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(['verify-email-address']);
    });
  }

  // Reset Forggot password
  reset = false;
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        // window.alert('Password reset email sent, check your inbox.');
        this.reset = true;
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('admin'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        // window.alert(error)
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`
    );
    const userData: Users = {
      id: user.id,
      email: user.email,
      vaiTro: user.vaiTro,
      hoVaTen: user.hoVaTen,
      hinhAnhUser: user.hinhAnhUser,
      diaChiUser: user.diaChiUser,
      matKhau: user.matKhau,
      xacNhanMatKhau: user.xacNhanMatKhau,
      ngayLap: user.ngayLap,
      dienThoai: user.dienThoai,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('admin');
      localStorage.removeItem('user');
      sessionStorage.setItem('userr', null);
      // this.router.navigate(['login']);
    });
  }
}
