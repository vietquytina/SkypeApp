import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class RouteService {
    constructor(private route: Router) {
    }

    public navigateToLogin(): void {
        this.route.navigate(['/']);
    }

    public navigateTo(url: string): void {
        this.route.navigate([url]);
    }
}