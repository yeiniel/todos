import { MockBuilder, MockedComponentFixture, MockRender, ngMocks } from 'ng-mocks';
import { RouterOutlet } from '@angular/router';

import { AppComponent } from './app.component';
import { LogoutComponent } from './auth';

describe(AppComponent.name, () => {
  let fixture: MockedComponentFixture<AppComponent>; 

  beforeEach(async () => {
    await  MockBuilder(AppComponent);
  
    fixture = MockRender(AppComponent);
  });

  it('show the app-auth-logout component', () => {
    expect(ngMocks.find(LogoutComponent)).toBeDefined();
  });

  it('show the router-outlet component', () => {
    expect(ngMocks.find(RouterOutlet)).toBeDefined();
  });
});
