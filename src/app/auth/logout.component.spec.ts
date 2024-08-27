import { MockBuilder, MockedComponentFixture, MockInstance, MockRender, ngMocks } from "ng-mocks";
import { BehaviorSubject, EMPTY, Subject } from "rxjs";

import { LogoutComponent } from "./logout.component";
import { AuthService } from "./auth.service";
import { User } from "./user";
import { AsyncPipe } from "@angular/common";
import { Router } from "@angular/router";

describe(LogoutComponent.name, () => {
    let userSubject: Subject<User | null>;
    let logoutSubject: Subject<void>;
    let fixture: MockedComponentFixture<LogoutComponent>;

    beforeEach(async () => {
        userSubject = new BehaviorSubject<User | null>({ email: `some-email` });
        logoutSubject = new Subject<void>();

        await MockBuilder(LogoutComponent)
            .mock(Router, {
                navigateByUrl: jest.fn()
            })
            .mock(AuthService, {
                getUser: () => userSubject.asObservable(),
                logout: jest.fn(() => logoutSubject.asObservable())
            })
            .keep(AsyncPipe);
        
        fixture = MockRender(LogoutComponent);
    });

    it('should show button if user is authenticated', () => {
        expect(ngMocks.findAll('button').length).toBe(1);
    });

    it('should hide button if user is not authenticated', () => {
        userSubject.next(null);

        fixture.detectChanges();

        expect(ngMocks.findAll('button').length).toBe(0);
    });

    it('should logout user and navigate to auth', () => {
        ngMocks.click('button');

        fixture.detectChanges();

        expect(ngMocks.get(AuthService).logout)
            .toHaveBeenCalled();

        expect(ngMocks.get(Router).navigateByUrl)
            .not.toHaveBeenCalled()

        logoutSubject.next();

        expect(ngMocks.get(Router).navigateByUrl)
            .toHaveBeenCalledWith('/auth')
    });
});