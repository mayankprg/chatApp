import { AfterViewInit, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { FriendComponent } from "../all-friends/friend/friend.component";
import { Friend, FriendsService } from '../friendsService';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';


@Component({
	selector: 'app-search-user',
	imports: [FriendComponent, ReactiveFormsModule],
	templateUrl: './search-user.component.html',
	styleUrl: './search-user.component.css',
	host: {
		'(document:click)': 'closeMenu($event)',
	}
})
export class SearchUserComponent implements AfterViewInit {
	private elementRef = inject(ElementRef);
	private friendService = inject(FriendsService);
	private destroyRef = inject(DestroyRef);

	searchForm = new FormGroup({
		search: new FormControl('', {
			validators: []
		})
	})

	friendList = signal<Friend[] | null>(null);
	isOpen = signal(false);


	ngAfterViewInit() {
		const subscription = this.searchForm.valueChanges.pipe(
			debounceTime(300), // Wait for user to stop typing
			map(formVal => formVal.search?.trim()), // Get trimmed search term
			filter(searchTerm => !!searchTerm), // Ignore empty searches
			distinctUntilChanged(), // Avoid unnecessary API calls for the same term
			switchMap(searchTerm => {
				return this.friendService.findUser(searchTerm!).pipe(
					withLatestFrom(this.friendService.friendsChatsList$),
					map(([searchResults, newfriendList]) =>
						searchResults.filter(user => {
							if(!newfriendList) return true;
							return !newfriendList.some(friend => friend.username === user.username) // Remove friends
						})
					)
				)
			})
		).subscribe({
			next: filteredResults => {
				this.friendList.set(filteredResults); // Only show non-friends
			},
			error: err => console.error("Error fetching user:", err)
		});

		this.destroyRef.onDestroy(() => {
			subscription.unsubscribe();
		});
	}

	closeMenu(event: Event) {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.friendList.set(null)
			this.isOpen.set(false);
			this.searchForm.reset()
		}
	}

	onToggle() {
		this.friendList.set(null)
		this.searchForm.reset()
		this.isOpen.set(!this.isOpen())
	}




}
