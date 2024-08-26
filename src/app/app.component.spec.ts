import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { AppComponent } from './app.component';
import { LogoutComponent } from './auth';

@Component({
  standalone: true,
  selector: 'app-auth-logout',
  template: ''
})
class MockAuthLogout {}

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.overrideComponent(AppComponent, {
      remove: { imports: [LogoutComponent] },
      add: { imports: [MockAuthLogout] }
    })

    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
