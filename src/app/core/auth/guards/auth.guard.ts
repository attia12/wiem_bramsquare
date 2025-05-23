// import { inject } from '@angular/core';
// import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
// import { first, of, switchMap } from 'rxjs';
// import { Store } from '@ngrx/store';
// import { selectIsAuthenticated } from '../../../../store/user/user.selectors';
//
// export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
//     const router: Router = inject(Router);
//     const store: Store = inject(Store);
//
//     return store.select(selectIsAuthenticated).pipe(
//         first(),
//         switchMap((isAuthenticated) => {
//             if (!isAuthenticated) {
//                 console.log("User not authenticated, redirecting to /sign-in");
//                 return of(router.createUrlTree(['/sign-in']));
//             }
//             return of(true);
//         })
//     );
// };
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { first, switchMap, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated, selectRole } from '../../../../store/user/user.selectors';

export const AuthGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const store: Store = inject(Store);

    return store.select(selectIsAuthenticated).pipe(
        first(),
        switchMap((isAuthenticated) => {
            if (!isAuthenticated) {
                console.log("User not authenticated, redirecting to /sign-in");
                return of(router.createUrlTree(['/sign-in']));
            }

            // Check the user's role
            return store.select(selectRole).pipe(
                first(),
                switchMap((role) => {
                    if (role !== 'FINANCIER') {
                        console.log("User does not have 'financier' role, redirecting to /not-authorized");
                        return of(router.createUrlTree(['/sign-in']));
                    }
                    return of(true);
                })
            );
        })
    );
};
