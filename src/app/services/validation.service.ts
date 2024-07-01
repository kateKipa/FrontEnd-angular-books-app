import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";

@Injectable({
    providedIn: 'root'
  })
  export class ValidationService {

    nameValidator(fieldName: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
          const value = control.value;
          if (value && (value.length < 2 || value.length > 50)) {
            return { minLength: true, message: `${fieldName} should be between 2 and 50 characters`};
          }
          return null;
        };
      }
  }