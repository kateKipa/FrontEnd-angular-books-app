import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Credentials} from 'src/app/shared/interfaces/user';

import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent {
  userService = inject(UserService)
  validationService = inject(ValidationService)
  router = inject(Router)     //κανω inject το Router γιατι θα κανω navigate

  errorMessage?: string;

  form = new FormGroup ({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl<boolean>(false)
  })

  onSubmit() {

    const credentials = this.form.value as Credentials
    this.userService.loginUser(credentials).subscribe({
      next: (response) => {
        console.log(response)
        const accessToken = response.token

        localStorage.setItem('access_token', accessToken);

        this.userService.setUserFromToken(accessToken);
      
        this.router.navigate(['/my-profile'])
      },
      error: (response) => {
        console.error(response)
        this.errorMessage = Object.values(response.error.errors)[0][0]
        //console.log(this.errorMessage)

        if (response.status !== 401 && response.status !== 400) {
        this.errorMessage = 'An error occurred during login.';
        }
      }
    })
  }
}
