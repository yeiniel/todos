import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="login()">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" formControlName="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  `,
  styles: ``
})
export class LoginComponent {
  protected loginForm: FormGroup;

  constructor(formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  protected login() {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).pipe(take(1)).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: err => alert(err.message)
    });
  }
}
