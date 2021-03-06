// import { UserStoreService } from 'src/app/services/user-store.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  currentUserID: string;
  // currentUsername: string;
  currentUserMail: string;
  currentUserActivities: number[] = [];

  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router) {
    // initalize the current user
    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.currentUserID = user.uid;
          this.currentUserMail = user.email;
          return this.angularFirestore.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

    // get the activities of the current user
    this.user$.subscribe(user => {
      if (user !== null && user !== undefined) {
        this.currentUserActivities = user.activities;
      }
    }, () => {
    });
  }

  isloggedIn(): boolean {
    const user = this.angularFireAuth.auth.currentUser;
    if (user) {
      return this.isLoggedIn = true;
    } else {
      return this.isLoggedIn = false;
    }
  }

  // get the current user
  getCurrentUser() {
    return this.user$.pipe(first()).toPromise();
  }

  async validatePassword(password: string) {
    const credential = firebase.auth.EmailAuthProvider.credential(this.currentUserMail, password);
    await this.angularFireAuth.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(credential);
  }

  // logout the current user
  async logout() {
    await this.angularFireAuth.auth.signOut();
    this.isLoggedIn = false;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // login with given mail and password
  async login(mail: string, password: string) {
      await this.angularFireAuth.auth.signInWithEmailAndPassword(mail, password);
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
  }
}
