import { MockBuilder, MockedComponentFixture, MockRender, ngMocks } from "ng-mocks";
import { BehaviorSubject, Subject } from "rxjs";
import { Router } from "@angular/router";
import { Auth, user } from "@angular/fire/auth";

import { LogoutComponent } from "./logout.component";
import { AuthService } from "./auth.service";
import { User } from "./user";

jest.mock('@angular/fire/auth', () => ({
    ...jest.requireActual('@angular/fire/auth'),
    user: jest.fn()
}));

describe(LogoutComponent.name, () => {
    let userSubject: Subject<User | null>;
    let fixture: MockedComponentFixture<LogoutComponent>;

    beforeEach(async () => {
        userSubject = new BehaviorSubject<User | null>({ email: `some-email` });
    
        (user as unknown as jest.SpyInstance)
            .mockReturnValue(userSubject.asObservable());

        await MockBuilder()
            .keep(LogoutComponent, {
                shallow: false
            })
            .keep(AuthService)
            .mock(Router, {
                navigateByUrl: jest.fn()
            })
            .mock(Auth, {
                signOut: jest.fn().mockResolvedValue(undefined),
            });
        
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

        expect(ngMocks.get(Auth).signOut)
            .toHaveBeenCalled();

        expect(ngMocks.get(Router).navigateByUrl)
            .toHaveBeenCalledWith('/auth')
    });
});