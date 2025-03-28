import { Routes } from '@angular/router';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { ChatComponent } from './chat/chat.component';
import { AuthComponent } from './auth/auth.component';
import { canActivate } from './auth/auth.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'friends',
        component: FriendsListComponent,
        canActivate: [canActivate]

    },
    {
        path: 'chat',
        component: ChatComponent,
        canActivate: [canActivate]
    }

];
