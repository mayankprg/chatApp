import { HttpClient} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ApiURL, AuthService } from "../auth/auth.service";




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


    // TODO handle errors 

    addFriend(userId: string) {
        return this.httpClient.post(ApiURL + '/addFriend', {
            userId: userId
        })
    }



    findUser(username: string) {
        return this.httpClient.post<Friend[]>(ApiURL + '/findUser', {
            username: username
        })

    }



    getAllFriends() {
        return this.httpClient.get<Friend[]>(ApiURL + '/getAllFriends');
    }

}