import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/interfaces/user';
import { CommonModule } from '@angular/common';
import { ValidationService } from 'src/app/services/validation.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {


  userService = inject(UserService)
  validationService = inject(ValidationService)

  registrationStatus: {success: boolean, message:string} = {      //Δημιουργω τη μεταβλητη κ την αρχικοποιώ
    success: null,
    message: null
  }

  allErrorMessages: string[] = [];
  errorResponse: any | null = null;


  form = new FormGroup({
    firstName: new FormControl('', [Validators.required, this.validationService.nameValidator('First Name')]),
    lastName: new FormControl('', [Validators.required, this.validationService.nameValidator('Last Name')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, this.validationService.nameValidator('Username')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(13)]),
    city: new FormControl('', Validators.maxLength(50)),
    address: new FormControl('', Validators.maxLength(50)),
    number: new FormControl('', Validators.maxLength(10))
  },
  this.passwordConfirmValidator
)

  passwordConfirmValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({passwordMismatch: true })
      return { passwordMismatch : true}
    }
    return {}
  }

  onSubmit(value:any) {
    console.log(value)
    this.allErrorMessages = []
    this.errorResponse = null

    const user = this.form.value as User
    delete user['confirmPassword']

    this.userService.registerUser(user).subscribe({
      next: (response) => {
        console.log(response)
        // console.log('User signed up successfully ', response.msg)
        this.registrationStatus = {success: true, message: `User with username "${user.username}" is registered successfully`}
      }, 

      error: (response) => {
        console.error(response)
        // console.error('Error registering user: ', response);
        this.registrationStatus = { success: false, message: "Errors" };

        

        this.errorResponse = response.error.errors
        for (const field in this.errorResponse) {
          this.allErrorMessages.push(...this.errorResponse[field])
        }
        //console.log(this.allErrorMessages)
      }
    })
  }

  registerAnotherUser() {
    this.form.reset()
    this.registrationStatus = {
      success: false,
      message: 'Not attempted yet'
    }
  }
 
}
