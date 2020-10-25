import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs-compat';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      map(user => {
        if (user)
          return true;

        this.router.navigate(['/login'], { queryParams: { returnURL: state.url } });
        return false;
      })
    );
  }
}
