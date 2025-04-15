import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FriendComponent } from "./friend/friend.component";
import { Friend, FriendsService } from '../friendsService';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
	selector: 'app-all-friends',
	imports: [FriendComponent, AsyncPipe],
	templateUrl: './all-friends.component.html',
	styleUrl: './all-friends.component.css',
	
})
export class AllFriendsComponent implements OnInit{
	private friendsService = inject(FriendsService);

	friendList = this.friendsService.friendsChatsList$
	
	ngOnInit(): void {
		this.friendsService.getAllFriends()	
		
	}

	onClick() {
		console.log("clicked");
	}




}
