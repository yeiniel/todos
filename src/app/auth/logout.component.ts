import { Component } from '@angular/core';
import { map, take } from 'rxjs';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth-logout',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    @if (isAuthenticated$ | async) {
      <button (click)="logout()">Logout</button>
    }
  `,
  styles: ``
})
export class LogoutComponent {
  protected readonly isAuthenticated$;

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated$ = this.authService.getUser().pipe(map(user => !!user));
  }

  protected async logout() {
    this.authService.logout().pipe(take(1)).subscribe({
      next: () => this.router.navigateByUrl('/auth'),
      error: (err) => alert(err.message)
    });
  }
}
