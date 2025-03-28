import { Component } from '@angular/core';
import { FriendComponent } from "./friend/friend.component";
import { dummyFriends, Friend } from '../../dummyFriends';

@Component({
	selector: 'app-all-friends',
	imports: [FriendComponent],
	templateUrl: './all-friends.component.html',
	styleUrl: './all-friends.component.css',
	host: {
		"(click)": "onClick($event)"
	}
})
export class AllFriendsComponent {
	friendList: Friend[] = dummyFriends

	onClick() {
		console.log("clicked");
	}


}
