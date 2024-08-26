import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<User | undefined>({
    id: 'susana'
  })

  public getUser() {
    return this.userSubject.asObservable();
  }
}
