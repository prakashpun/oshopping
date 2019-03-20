import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then( result => {
      if ( result.user) {
        const route = localStorage.getItem('returnUrl');
        this.router.navigate([route]);
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
