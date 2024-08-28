import { MockBuilder, MockedComponentFixture, MockRender, ngMocks } from "ng-mocks";
import { AuthService } from "./auth.service";
import { Auth, signInWithEmailAndPassword, user } from "@angular/fire/auth";
import { firstValueFrom, of } from "rxjs";

jest.mock('@angular/fire/auth', () => ({
    ...jest.requireActual('@angular/fire/auth'),
    signInWithEmailAndPassword: jest.fn().mockResolvedValue(undefined),
    user: jest.fn().mockReturnValue(undefined)
}));

describe(AuthService.name, () => {
    let fixture: MockedComponentFixture<AuthService>;

    beforeEach(async () => {
        await MockBuilder(AuthService)
            .mock(Auth, {
                signOut: jest.fn().mockResolvedValue(undefined),
            })
            .mock(signInWithEmailAndPassword, jest.fn());

        fixture = MockRender(AuthService);
    });

    describe(AuthService.prototype.getUser.name, () => {
        it('should return user', async () => {
            const userRecord = { email: 'some-email' };
            (user as unknown as jest.SpyInstance).mockReturnValue(of(userRecord));

            const response = await firstValueFrom(fixture.point.componentInstance.getUser());

            expect(user).toHaveBeenCalledWith(ngMocks.get(Auth));
            expect(response).toEqual(userRecord);
        });
    });

    describe(AuthService.prototype.login.name, () => {
        it('should login user', async () => {
            const email = 'some-email';
            const password = 'XXXXXXXXXXXXX';
            
            fixture.point.componentInstance.login(email, password);

            expect(signInWithEmailAndPassword)
                .toHaveBeenCalledWith(ngMocks.get(Auth), email, password);
        });
    });

    describe(AuthService.prototype.logout.name, () => {
        it('should logout user', () => {
            fixture.point.componentInstance.logout();

            expect(ngMocks.get(Auth).signOut).toHaveBeenCalled();
        });
    });
});