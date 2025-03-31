import { AfterViewInit, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { FriendComponent } from "../all-friends/friend/friend.component";
import { Friend, FriendsService } from '../friendsService';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, subscribeOn, Subscription } from 'rxjs';


@Component({
	selector: 'app-search-user',
	imports: [FriendComponent, ReactiveFormsModule],
	templateUrl: './search-user.component.html',
	styleUrl: './search-user.component.css',
	host: {
		'(document:click)': 'closeMenu($event)',
	}
})
export class SearchUserComponent implements AfterViewInit{
	private elementRef = inject(ElementRef);
	private friendService = inject(FriendsService);
	private destroyRef = inject(DestroyRef);

	searchForm = new FormGroup({
		search : new FormControl('', {
			validators: []
		})
	})

	friendList = signal<Friend[] | null>(null);
	isOpen = signal(false);



	ngAfterViewInit(){

		const Subscription =  this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe({
			next: (val) =>  {
				if (val.search) {
					this.friendService.findUser(val.search).subscribe({
						next: res => {	
							this.friendList.set(res)
						}
					})
				}
			}
		})

		this.destroyRef.onDestroy(()=> {
			Subscription.unsubscribe()
		})


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
