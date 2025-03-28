import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-friend',
  imports: [],
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.css'
})
export class FriendComponent {
  friend = input.required<{name: string, avatar: string}>();
}
