import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    constructor() {
    }

    public getToken(): string {
        return localStorage.getItem('Token');
    }

    public setToken(token: string): void {
        localStorage.setItem('Token', token);
    }

    public setStore(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public isLoggedIn(): boolean {
        return this.getToken() != null;
    }

    public logout(): void {
        localStorage.removeItem('Token');
    }
}