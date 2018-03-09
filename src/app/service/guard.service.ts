import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class loginGuard implements CanActivate {
    constructor(private Router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user = localStorage.getItem('currentUser');
        if(user){
            return true;
        }
        this.Router.navigate(['/dangnhap']);
        return false;
    }
}