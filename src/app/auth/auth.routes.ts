import { Routes } from "@angular/router";

import { LoginPage } from "./login.page";

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginPage
    }
];