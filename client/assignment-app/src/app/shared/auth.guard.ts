import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // si on renvoie true, la navigation vers route est autorisée, sinon refusée
    //return true;

    return this.authService.isAdmin()
    .then((authentifie): boolean => {
      if(authentifie) return true;
      else {
        this.router.navigate(["/home"]);
        return false;
      }
    })
  }
}
