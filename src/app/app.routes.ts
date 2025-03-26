import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// prettier-ignore
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    {path: '', pathMatch : 'full', redirectTo: 'dashboards/project'},

    // Redirect signed-in user to the '/dashboards/project'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {
        path: 'signed-in-redirect',
        pathMatch : 'full',
        redirectTo: 'dashboards/project'
    },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
        ]
    },

    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'classic'
        },
        resolve: {
            initialData: initialDataResolver
        },

        children: [
            {path: 'dashboard', children: [
                    {path:'payment', loadChildren: () => import('app/modules/payment/payment.routes')},
                    {path:'investissement', loadChildren: () => import('app/modules/Investissement/investissement.routes')},
                    {path:'delivery-costs', loadChildren: () => import('app/modules/couts_de_livraison/delivery-costs.routes')},
                    {path:'transaction', loadChildren: () => import('app/modules/transaction/transaction.routes')},
                    {path:'commissions', loadChildren: () => import('app/modules/commission/commission.routes')},
                    {path:'paylist', loadChildren: () => import('app/modules/paylist/paylist.routes')},

            ]},
        ]
    },



    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [

            // Dashboards
            {path: 'dashboards', children: [
                {path: 'project', loadChildren: () => import('app/modules/admin/dashboards/project/project.routes')},
                {path: 'analytics', loadChildren: () => import('app/modules/admin/dashboards/analytics/analytics.routes')},
                {path: 'finance', loadChildren: () => import('app/modules/admin/dashboards/finance/finance.routes')},
                {path: 'crypto', loadChildren: () => import('app/modules/admin/dashboards/crypto/crypto.routes')},
            ]},

            // Apps
            {path: 'apps', children: [

                {path: 'tasks', loadChildren: () => import('app/modules/admin/apps/tasks/tasks.routes')},
            ]},

            // Pages
            {path: 'pages', children: [




                // Error
                {path: 'error', children: [
                    {path: '404', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.routes')},
                    {path: '500', loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.routes')}
                ]},




                // Settings
                {path: 'settings', loadChildren: () => import('app/modules/admin/pages/settings/settings.routes')},
            ]},





            // 404 & Catch all
            {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.routes')},
            {path: '**', redirectTo: '404-not-found'}
        ]
    }
];
