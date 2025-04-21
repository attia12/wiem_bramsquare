import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {  MatMenuModule } from '@angular/material/menu';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { Store } from '@ngrx/store';
import { logoutApi } from '../../../../store/user/user.actions';

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
    constructor(private store: Store) {}
    onLogout(): void {
        console.log("logging out");
        this.store.dispatch(logoutApi());

    }
}
