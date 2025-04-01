import { HttpClient} from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { ApiURL, AuthService } from "../auth/auth.service";
import { BehaviorSubject, tap } from "rxjs";

export type Friend = {
    username: string
    userId: string
    avatar: string
    
}

@Injectable({
    providedIn: 'root'
})
export class FriendsService {
    private httpClient = inject(HttpClient);
    private authService = inject(AuthService);

	// friendsChatsList$ = new BehaviorSubject<Friend[] | null>(null)

    private friendsChatsListSubject = new BehaviorSubject<Friend[]>([]);
    friendsChatsList$ = this.friendsChatsListSubject.asObservable();


    // TODO handle errors 

    addFriend(userId: string) {
        return this.httpClient.post(ApiURL + '/addFriend', {
            userId: userId
        }).pipe(
            tap(res => {
                // check if added 
                this.getAllFriends();
            })
        )
    }



    findUser(username: string) {
        return this.httpClient.post<Friend[]>(ApiURL + '/findUser', {
            username: username
        })

    }



    getAllFriends() {
        this.httpClient.get<Friend[]>(ApiURL + '/getAllFriends').subscribe({
            next:(res) => {
                this.friendsChatsListSubject.next(res)
            }
        })
    }

}