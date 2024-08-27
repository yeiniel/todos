import { MockBuilder, ngMocks } from "ng-mocks";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { EnvironmentInjector, runInInjectionContext } from "@angular/core";

import { userIdResolver } from "./user-id.resolver";
import { AuthService } from "./auth.service";
import { User } from "./user";

describe('userIdResolver', () => {
    let user: User;
    
    beforeEach(async () => {
        user = { email: `some-email` };

        await MockBuilder().mock(
            AuthService, {
                getUser: () => new BehaviorSubject(user).asObservable()
            }
        )
    });

    it('should work', async () => {
        const user$ = runInInjectionContext(
            ngMocks.get(EnvironmentInjector),
            () => {
                return (userIdResolver as Function)();
            }
        )

        await expect(firstValueFrom(user$)).resolves.toBe(user.email);
    })
});