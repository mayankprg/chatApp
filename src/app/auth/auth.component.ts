import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthResponse, AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

function usernameIsUnique(control: AbstractControl) {


	return of({
		notUnique: true
	})
}




@Component({
	selector: 'app-auth',
	imports: [ReactiveFormsModule],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.css'
})
export class AuthComponent {
	private authService = inject(AuthService);
	private router = inject(Router);
	modeSignup = signal(false);

	authForm = new FormGroup({
		username: new FormControl('', {
			validators: [Validators.required],
			// asyncValidators: [usernameIsUnique]
		}),
		password: new FormControl('', {
			validators: [Validators.required]
		})
	})


	changeMode() {
		this.modeSignup.set(this.modeSignup() ? false : true);
	}


	onSignup() {

		if (this.authForm.controls.password.invalid || this.authForm.controls.username.invalid) {
			return
		}
		const username = this.authForm.value.username;
    	const password = this.authForm.value.password;

		let authObs: Observable<AuthResponse>;

		if (this.modeSignup()) {
			authObs = this.authService.signUp(
				{
					username: username!,
					password:password!
				}
			)
		} else {
			authObs = this.authService.login(
				{
					username: username!,
					password:password!
				}
			)
		}
		authObs.subscribe(
			{
				next: (resData) => {
					console.log(resData);
					this.router.navigate([''])
				},
				error: (err) => {
					console.log(err);
					// handle error. ( show some error to the user )
				}
			}
		)
		this.authForm.reset()

	}
}
