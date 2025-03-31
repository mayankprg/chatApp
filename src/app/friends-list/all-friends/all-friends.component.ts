import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FriendComponent } from "./friend/friend.component";
import { Friend, FriendsService } from '../friendsService';

@Component({
	selector: 'app-all-friends',
	imports: [FriendComponent],
	templateUrl: './all-friends.component.html',
	styleUrl: './all-friends.component.css',
	host: {
		"(click)": "onClick($event)"
	}
})
export class AllFriendsComponent implements OnInit{
	private friendsService = inject(FriendsService);
	private destroyRef = inject(DestroyRef);



	friendList = signal<Friend[] | null>(null);
	
	ngOnInit(): void {
		const subscription = this.friendsService.getAllFriends().subscribe({
			next: (res) => {
				console.log(res);
				this.friendList.set(res)
				
			}
		})

		this.destroyRef.onDestroy(()=> {
			subscription.unsubscribe();
		})
	}


	onClick() {
		console.log("clicked");
	}


}
