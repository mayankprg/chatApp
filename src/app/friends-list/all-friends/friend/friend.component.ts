import { Component, inject, input, signal } from '@angular/core';
import { Friend, FriendsService } from '../../friendsService';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-friend',
	imports: [],
	templateUrl: './friend.component.html',
	styleUrl: './friend.component.css'
})
export class FriendComponent {
	private friendsService = inject(FriendsService);

	friend = input.required<Friend>();
	showAddFriend = input.required<boolean>();

	



	
	onAddFriend() {
		this.friendsService.addFriend(this.friend().userId).subscribe({
			next: res => {
				// probally run getAllFriends
				console.log(res);
				
			} 
		})
	}

		
}
