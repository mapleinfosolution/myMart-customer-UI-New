import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(): boolean {
    if (localStorage.getItem('userData') && localStorage.getItem('accessToken')) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthAccess implements CanActivate {
  constructor(private router: Router) { }
  canActivate(): boolean {
    if (!(localStorage.getItem('userData') && localStorage.getItem('accessToken'))) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
