import { AbstractControl } from '@angular/forms';

export class MyValidators {
  static isPriceValid(control: AbstractControl): object {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }

  static validPassword(control: AbstractControl): object {
    const password = control.value;
    if (!containsNumber(password)) {
      return { validpassword: true };
    }
    return null;
  }

  static matchPassword(control: AbstractControl): object {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password === confirmPassword) return null;

    return { matchpassword: true };
  }
}

function containsNumber(value: string): boolean {
  return value.split('').some(isNumber);
}

function isNumber(value: string): boolean {
  return !isNaN(parseInt(value, 10));
}
