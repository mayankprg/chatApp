import { Component, ElementRef, inject, signal } from '@angular/core';
import { FriendComponent } from "../all-friends/friend/friend.component";
import { dummyFriends, Friend } from '../../dummyFriends';
import { FriendsService } from '../friendsService';


@Component({
	selector: 'app-search-user',
	imports: [FriendComponent],
	templateUrl: './search-user.component.html',
	styleUrl: './search-user.component.css',
	host: {
		'(document:click)': 'closeMenu($event)',
	}
})
export class SearchUserComponent {
	private elementRef = inject(ElementRef);
	private friendService = inject(FriendsService);


	friendList: Friend[] = dummyFriends;

	isOpen = signal(false);

	

	closeMenu(event: Event) {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.isOpen.set(false);
		}
	}

	onToggle() {
		this.isOpen.set(!this.isOpen())
	}




}
