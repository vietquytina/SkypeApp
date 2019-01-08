import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from 'redux';

import { CustomValidator } from '../../validation/customValidations';
import { UserService } from '../../services/user.service';
import { RouteService } from '../../services/route.service';
import { AuthService } from '../../services/auth.service';
import { AccountViewModel } from '../../models/account.viewmodel';
import { AppStore } from '../../redux/app.store';
import { IAppState } from '../../redux/app.state';
import { SAVE_CURRENT_USER } from '../../constants/app.action';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService]
})
export class LoginComponent implements OnInit, AfterViewInit {
    public fg: FormGroup;
    public isClicked: boolean = false;
    public isValidInputInfo: boolean = false;
    public isSubmitted: boolean = false;
    public errors: string[] = [];

    constructor(private fb: FormBuilder, 
                private userService: UserService,
                private route: RouteService,
                private authService: AuthService,
                @Inject(AppStore) private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.fg = this.fb.group({
            InputInfo: ['', [Validators.required, CustomValidator.isValidInputName]],
            Password: ['', [Validators.required, Validators.maxLength(250)]]
        });
    }

    ngAfterViewInit() {
        document.body.addEventListener('keydown', (e) => {
            if (e.keyCode == 13) {
                e.preventDefault();
                document.getElementById(this.isClicked?'btnLogin':'btnNext').click();
            }
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
            this.authService.setToken(res.Token);
            this.store.dispatch({ type: SAVE_CURRENT_USER, data: res });
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