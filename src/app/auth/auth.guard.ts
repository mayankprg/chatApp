import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RedirectCommand, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, tap } from "rxjs";

export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const user = authService.user.getValue()
    if(!user) {
        router.navigate(['/auth'])
        return false;
    }
    
    return true;

}