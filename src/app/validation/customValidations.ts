import { Validators, AbstractControl, ValidationErrors } from '@angular/forms';

export function isNumber(s: string) {
    for(let index = 0; index < s.length; index++) {
        if (s[index] >= '0' && s[index] <= '9') {
            return false;
        }
    }
    return true;
}

export function isPhoneNumber(s: string) {
    let pattern = new RegExp('/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/');
    return pattern.test(s);
}

export function isEmail(s: string) {
    return true;
}

export class CustomValidator extends Validators {
    static isValidInputName(control: AbstractControl): ValidationErrors | null {
        let value = control.value;
        let isNumber: boolean = !isNaN(value);
        let isEmailAddr: boolean = isEmail(value);
        let isphoneNumber: boolean = isPhoneNumber(value);
        if (isNumber || isEmailAddr || isphoneNumber) {
            return null;
        }
        return { 'isValidInputName': true };
    }
}