import { Routes } from "@angular/router";

import { IndexPage } from "./index.page";

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: IndexPage
    }
];