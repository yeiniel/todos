import { Routes } from '@angular/router';

import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo, userIdResolver } from './auth';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'todos'
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth').then(m => m.routes),
        ...canActivate(() => redirectLoggedInTo('todos'))
    },
    {
        path: 'todos',
        loadChildren: () => import('./todos').then(m => m.routes),
        ...canActivate(() => redirectUnauthorizedTo('auth')),
        resolve: {
            userId: userIdResolver
        }
    }
];
