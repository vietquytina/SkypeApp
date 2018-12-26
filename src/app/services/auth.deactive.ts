import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { RouteService } from './route.service';

@Injectable()
export class AuthDeactive implements CanActivate {
    constructor(private authService: AuthService, private routeService: RouteService) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
        if (this.authService.isLoggedIn()) {
            this.routeService.navigateTo('dashboard');
        }
        return !this.authService.isLoggedIn();
    }
}