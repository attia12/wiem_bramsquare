import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {  MatMenuModule } from '@angular/material/menu';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { Store } from '@ngrx/store';
import { logoutApi } from '../../../../store/user/user.actions';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,


    //styleUrl: './user-profile.component.scss',
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,

        MatDividerModule,
    ],

})
export class UserProfileComponent {
    private staticUserData = {
        id: '1',
        investorName: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Investor',

        description: 'An important investor in the company.',
        date: new Date(),

    };
    constructor(private store: Store,private router: Router) {}
    onLogout(): void {
        console.log("logging out");
        this.store.dispatch(logoutApi());

    }

    onProfileClick() {
        // Retrieve the user data from the store or session
        // this.store.pipe(select(selectUserState)).subscribe((userState) => {
        //     if (userState) {
        //         // Navigate to the profile component and pass the user data via state
        //         this.router.navigate(['/profile'], {
        //             state: { user: userState }, // Pass user data in the route state
        //         });
        //     }
        // });
        this.router.navigate(['/dashboard/profile'], {
                        state: { user: this.staticUserData },
                    });
    }
}
