import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CategoriesService } from './../core/services/categories.service';

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

  // ASYNC VALIDATION
  static validateCategory(service: CategoriesService) {
    return (control: AbstractControl) => {
      const value = control.value;

      return service.checkCategory(value).pipe(
        map((response: boolean) => {
          console.log("🚀 ~ MyValidators ~ map ~ response:", response)
          const isAvailable = response;

          if (!isAvailable) {
            return { validatecategory: true };
          }
          return null;
        })
      );
    };
  }
}

function containsNumber(value: string): boolean {
  return value.split('').some(isNumber);
}

function isNumber(value: string): boolean {
  return !isNaN(parseInt(value, 10));
}
