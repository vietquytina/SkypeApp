import { Injectable } from '@angular/core';

import { AccountViewModel } from '../models/account.viewmodel';

@Injectable()
export class AuthService {
    private _user: AccountViewModel = null;

    constructor() {
    }

    public getCurrentUser(): AccountViewModel {
        if (this._user == null) {
            this._user = new AccountViewModel();
            this._user.UserId = localStorage.getItem('UserId');
            this._user.Token = this.getToken();
            this._user.Name = localStorage.getItem('Name');
            this._user.DisplayName = localStorage.getItem('DisplayName');
            this._user.Expires = new Date(localStorage.getItem('Expires'));
        }
        return this._user;
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