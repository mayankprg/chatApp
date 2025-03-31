import { Component } from '@angular/core';
import { AllFriendsComponent } from "./all-friends/all-friends.component";
import { SearchUserComponent } from "./searchUser/search-user.component";


@Component({
	selector: 'app-friends-list',
	imports: [AllFriendsComponent, SearchUserComponent],
	templateUrl: './friends-list.component.html',
	styleUrl: './friends-list.component.css'
})
export class FriendsListComponent {

	

}
