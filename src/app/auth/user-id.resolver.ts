import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { map } from "rxjs";

import { AuthService } from "./auth.service";
import { User } from "./user";

export const userIdResolver: ResolveFn<User['email'] | undefined> = () => {
    const authService = inject(AuthService);

    return authService.getUser().pipe(
        map(user => user?.email)
    )
}