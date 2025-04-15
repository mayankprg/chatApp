import { Component, inject, input } from '@angular/core';
import { Friend, FriendsService } from '../../friendsService';
import { Router } from '@angular/router';


@Component({
	selector: 'app-friend',
	imports: [],
	templateUrl: './friend.component.html',
	styleUrl: './friend.component.css',
	host: {
		"(click)": "onClick($event)"
	}
})
export class FriendComponent {
	private friendsService = inject(FriendsService);
	private router = inject(Router);



	friend = input.required<Friend>();
	showAddFriend = input.required<boolean>();

	onClick() {
		if(!this.showAddFriend()) {
			
			console.log("clicked for chats");
		}
	}


	onAddFriend() {
		this.friendsService.addFriend(this.friend().userId).subscribe({
			next: res => {
				// probally run getAllFriends
				console.log(res);
				
			} 
		})
	}

		
}
