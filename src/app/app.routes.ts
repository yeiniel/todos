import { Routes } from '@angular/router';

import { userIdResolver } from './auth';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'todos'
    },
    {
        path: 'todos',
        loadChildren: () => import('./todos').then(m => m.routes),
        resolve: {
            userId: userIdResolver
        }
    }
];
