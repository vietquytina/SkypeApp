import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CustomValidator } from '../../validation/customValidations';
import { UserService } from '../../services/user.service';
import { RouteService } from '../../services/route.service';
import { AuthService } from '../../services/auth.service';
import { AccountViewModel } from '../../models/account.viewmodel';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    private isClicked: boolean = false;
    private isValidInputInfo: boolean = false;
    private isSubmitted: boolean = false;
    private fg: FormGroup;
    public errors: string[] = [];

    constructor(private fb: FormBuilder, 
                private userService: UserService,
                private route: RouteService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.fg = this.fb.group({
            InputInfo: ['', [Validators.required, CustomValidator.isValidInputName]],
            Password: ['', [Validators.required, Validators.maxLength(250)]]
        });
    }

    public get f() {
        return this.fg.controls;
    }

    public next(): void {
        this.isValidInputInfo = true;
        if (!this.fg.controls.InputInfo.invalid) {
            this.isClicked = true;
        }
    }

    public back(): void {
        this.isClicked = false;
        this.isValidInputInfo = false;
        this.isSubmitted = false;
    }

    public onSubmit(): void {
        this.isSubmitted = true;
        if (this.fg.invalid) {
            return;
        }
        this.userService.login(this.fg.value).subscribe((res: AccountViewModel) => {
            this.authService.setStore('UserId', res.UserId);
            this.authService.setStore('Name', res.Name);
            this.authService.setStore('DisplayName', res.DisplayName);
            this.authService.setToken(res.Token);
            this.authService.setStore('Expires', res.DisplayName);
            this.route.navigateTo('dashboard');
        }, (err: any) => {
            let errs: string[] = err.statusText.split(',');
            this.errors.splice(0, this.errors.length);
            errs.forEach((value: string, index: number) => {
                this.errors.push(value);
            });
        });
    }
}