import { HttpClient} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ApiURL, AuthService } from "../auth/auth.service";



@Injectable({
    providedIn: 'root'
})
export class FriendsService {
    private httpClient = inject(HttpClient);
    private authService = inject(AuthService);



    getNewFriend(username: string) {
        return this.httpClient.post(ApiURL + '/findUser', {
            username: username
        });

    }



    getFriends() {
        return this.httpClient.get(ApiURL + '/getFriends');
    }

}