import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ApiURL } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class FriendsService {
    private httpClient = inject(HttpClient);



    getFriends() {
     
        return this.httpClient.get(ApiURL + '/getFriends',  {headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…TgyfQ.7UThk53s0rYbmmsQ0GIyxZd8CPOkt663RClPCr7mpok'
        }});
    }

}