import { MockBuilder, MockedComponentFixture, MockRender, ngMocks } from "ng-mocks";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";

import { LoginPage } from "./login.page";
import { AuthService } from "./auth.service";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { UserCredential } from "@angular/fire/auth";

describe(LoginPage.name, () => {
    let fixture: MockedComponentFixture<LoginPage>;

    beforeEach(async () => {
        await MockBuilder(LoginPage)
            .mock(Router, {
                navigateByUrl: jest.fn()
            })
            .mock(AuthService, {
                login: jest.fn(() => of(undefined) as unknown as Observable<UserCredential>)
            })
            .keep(ReactiveFormsModule)
            .keep(FormBuilder);

        fixture = MockRender(LoginPage);
    });

    it('should exist', () => {
        expect(fixture.point.componentInstance).toBeDefined();
    });

    it('should login user and redirect to home', async () => {
        const email = 'some-email';
        const password = 'XXXXXXXXXXXXX';
        ngMocks.change('input[id="email"]', email);
        ngMocks.change('input[id="password"]', password);
        ngMocks.trigger('button[type="submit"]', 'submit');

        fixture.detectChanges();

        expect(ngMocks.get(AuthService).login)
            .toHaveBeenCalledWith(email, password);

        expect(ngMocks.get(Router).navigateByUrl)
            .toHaveBeenCalledWith('/')
    })
});