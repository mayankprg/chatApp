import { Routes } from '@angular/router';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { ChatComponent } from './chat/chat.component';
import { AuthComponent } from './auth/auth.component';
import { canActivate } from './auth/auth.guard';
import { AppComponent } from './app.component';
import { NoChatComponent } from './no-chat/no-chat.component';

export const routes: Routes = [
    {
        path:'',
        component: NoChatComponent,
        canActivate: [canActivate]
    },
    {
        path: 'auth',
        component: AuthComponent
    }, 
    {
        path: 'chat/:userId',
        component: ChatComponent,
        canActivate: [canActivate]
    }

];
