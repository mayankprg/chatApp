import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AllFriendsComponent } from "./all-friends/all-friends.component";
import { SearchUserComponent } from "./searchUser/search-user.component";
import { AuthService } from '../auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
	selector: 'app-friends-list',
	imports: [AllFriendsComponent, SearchUserComponent, ReactiveFormsModule],
	templateUrl: './friends-list.component.html',
	styleUrl: './friends-list.component.css'
})
export class FriendsListComponent {
	

	searchChatsForm = new FormGroup({
		searchChats : new FormControl('', {

		})
	})





}
