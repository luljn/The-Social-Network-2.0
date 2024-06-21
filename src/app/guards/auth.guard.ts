import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { LocalStorageService } from '../services/localstorage.services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router,
              private localstorageService: LocalStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const connectedUser = this.localstorageService.getItem('connectedUser');
    if(connectedUser){

        return true;
    }

    else{

        this.router.navigateByUrl('');
        return false;
    }
  }
}