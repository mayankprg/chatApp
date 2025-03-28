import { Component, signal } from '@angular/core';


@Component({
	selector: 'app-search-user',
	imports: [],
	templateUrl: './search-user.component.html',
	styleUrl: './search-user.component.css',
	animations: [
		
	]
})
export class SearchUserComponent {
	
	isOpen = signal(false);

	onToggle() {
		this.isOpen.set(!this.isOpen())
	}
}
