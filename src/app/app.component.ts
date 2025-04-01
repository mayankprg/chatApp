import { AfterViewInit, Component, DestroyRef, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { AuthService } from './auth/auth.service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, FriendsListComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
	private authService = inject(AuthService);
	private destroyRef = inject(DestroyRef);

	isLoggedIn = signal(false);


	ngOnInit(): void {
		const subscription =  this.authService.user.subscribe({
			next: (user) => {
					this.isLoggedIn.set(!!user);					
			}
		})

		this.destroyRef.onDestroy(()=> {
			subscription.unsubscribe()
		})
		this.authService.autoLogin();
	}


	

	title = 'chatApp';
}
