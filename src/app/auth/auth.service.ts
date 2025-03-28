import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export const ApiURL = "http://localhost:3000/api"


export interface AuthResponse {
	username: string,
	userId: string,
	token: string,
	expiresIn: number

}


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	user = new BehaviorSubject<User | null>(null);
	private tokenExpirationTimer: any;

	private httpClient = inject(HttpClient);
	private router = inject(Router);


	signUp(data: { username: string, password: string }) {
		return this.httpClient.post<AuthResponse>(ApiURL + '/signup', {
			username: data.username,
			password: data.password,
			returnSecureToken: true
		}).pipe(
			catchError(this.handleError),
			tap(resData => {
				this.handleAuthentication(
					resData.username,
					resData.userId,
					resData.token,
					resData.expiresIn
				)
			})
		)
	}

	login(data: { username: string, password: string }) {
		return this.httpClient.post<AuthResponse>(ApiURL + '/login', {
			username: data.username,
			password: data.password,
			returnSecureToken: true
		}).pipe(
			catchError(this.handleError),
			tap(resData => {
				this.handleAuthentication(
					resData.username,
					resData.userId,
					resData.token,
					resData.expiresIn
				)
			})
		)
	}

	logout() {
		this.user.next(null);
		this.router.navigate(['/auth'])
		localStorage.removeItem('userData');
		if(this.tokenExpirationTimer) {
			clearTimeout(this.tokenExpirationTimer);
		}
		this.tokenExpirationTimer = null;
	}

	autoLogout(expirationDuration: number) {
		this.tokenExpirationTimer = setTimeout(()=> {
			this.logout()
		}, expirationDuration)
	}

	autoLogin() {
		const userData:{
			username: string,
			userId: string,
			_token: string,
			_tokenExpirationDate: string
		} = JSON.parse(localStorage.getItem('userData')!);
		if(!userData) {
			return;
		}
		const loadedUser = new User(
			userData.username,
			userData.userId,
			userData._token,
			new Date(userData._tokenExpirationDate)
		)
		this.user.next(loadedUser);
		// TODO should the user not be permitted to access Auth page 
		// this.router.navigate(['/friends']); 
		const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
		this.autoLogout(expirationDuration);
	}


	handleAuthentication(
		username: string,
		userId: string,
		token: string,
		expiresIn: number
	) {
		const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
		const newUser = new User(username, userId, token, expirationDate)
		this.user.next(newUser);
		this.autoLogout(expiresIn * 1000);
		localStorage.setItem('userData', JSON.stringify(newUser))
	}

	private handleError(errorRes: HttpErrorResponse) {
		let error = "An unknown error occured"
		return throwError(() => new Error(error))
	}



}
