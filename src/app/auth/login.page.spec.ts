import { MockBuilder, MockedComponentFixture, MockRender, ngMocks } from "ng-mocks";
import { Router } from "@angular/router";
import { Auth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { FormBuilder } from "@angular/forms";

import { LoginPage } from "./login.page";
import { AuthService } from "./auth.service";

jest.mock('@angular/fire/auth', () => ({
    ...jest.requireActual('@angular/fire/auth'),
    signInWithEmailAndPassword: jest.fn().mockResolvedValue(undefined),
}));

describe(LoginPage.name, () => {
    let fixture: MockedComponentFixture<LoginPage>;

    beforeEach(async () => {
        await MockBuilder()
            .keep(LoginPage, {
                shallow: false
            })
            .keep(AuthService)
            .mock(Router, {
                navigateByUrl: jest.fn()
            })
            .mock(Auth)
            .mock(signInWithEmailAndPassword, jest.fn())
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

        expect(signInWithEmailAndPassword)
            .toHaveBeenCalledWith(ngMocks.get(Auth), email, password);

        expect(ngMocks.get(Router).navigateByUrl)
            .toHaveBeenCalledWith('/')
    })
});