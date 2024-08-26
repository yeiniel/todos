import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LogoutComponent } from './auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LogoutComponent],
  template: `
    <h1>Todos <app-auth-logout /></h1>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {}
