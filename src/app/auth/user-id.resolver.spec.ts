import { MockBuilder, ngMocks } from "ng-mocks";
import { firstValueFrom, of } from "rxjs";
import { EnvironmentInjector, runInInjectionContext } from "@angular/core";
import { Auth, user } from "@angular/fire/auth";

import { userIdResolver } from "./user-id.resolver";
import { AuthService } from "./auth.service";
import { User } from "./user";

jest.mock('@angular/fire/auth', () => ({
    ...jest.requireActual('@angular/fire/auth'),
    user: jest.fn()
}));

describe('userIdResolver', () => {
    let userObj: User;
    
    beforeEach(async () => {
        userObj = { email: `some-email` };

        (user as unknown as jest.SpyInstance)
            .mockReturnValue(of(userObj));

        await MockBuilder(AuthService)
            .mock(Auth);
    });

    it('should work', async () => {
        const userId$ = runInInjectionContext(
            ngMocks.get(EnvironmentInjector),
            () => {
                return (userIdResolver as Function)();
            }
        )

        expect(user).toHaveBeenCalledWith(ngMocks.get(Auth));

        await expect(firstValueFrom(userId$)).resolves.toBe(userObj.email);
    })
});