import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  public getUser() {
    return user(this.auth) as Observable<User | null>;
  }

  public login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  public logout() {
    return from(this.auth.signOut());
  }
}
