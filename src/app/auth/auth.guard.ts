import { inject } from "@angular/core";
import { RouterStateSnapshot } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { CanActivateFn } from "@angular/router";
import { map, take } from "rxjs";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user.pipe(
    take(1),
    map(
    user => {
      const isAuth = !!user;
      if(isAuth){
        return true;
      }
      return router.createUrlTree(['/auth']);
    }
  ), )
}

