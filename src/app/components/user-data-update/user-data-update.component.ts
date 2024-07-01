import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';
import { User } from 'src/app/shared/interfaces/user';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-data-update',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-data-update.component.html',
  styleUrl: './user-data-update.component.css'
})
export class UserDataUpdateComponent implements OnInit {
  //userService = inject(UserService)
  validationService = inject(ValidationService)
  router = inject(Router)
  
  userForm: FormGroup;
  user: User | null = null;
  successInUpdate = ''
  successInFetchingData = ''
  errorMessage? : string
  updateMessage? : string = ''
  

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      id: [''],
      firstname: ['',[Validators.required, this.validationService.nameValidator('First Name')]],
      lastname: ['',[Validators.required, this.validationService.nameValidator('Last Name')]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, this.validationService.nameValidator('Username')]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      phoneNumber: ['',[Validators.required, Validators.maxLength(13)]],
      city: ['',Validators.maxLength(50)],
      address: ['', Validators.maxLength(50)],
      number: ['',Validators.maxLength(10)]
    
    });
  }

  ngOnInit(): void {
    this.userService.getUserData()
      .subscribe({
        next: (data: User) => {
          this.user = data;
          this.userForm.patchValue(data);
          console.log(this.user)
          this.successInFetchingData = 'success'
        },
        error: (response) => {
          console.error('Failed to fetch user data', response);
          this.successInFetchingData = 'fail'
          this.errorMessage = 'Failed to fetch user data'
        console.log(this.errorMessage)
        }
      });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.value as User;


      if (!updatedUser.id) {
        console.error("User ID is missing");
        this.errorMessage = "User ID is missing";
        return;
      }


      this.userService.updateUserData(updatedUser).subscribe({
        next: (response) => {
          console.log('User updated successfully', response)
          this.successInUpdate = 'success'
          this.updateMessage = 'User updated successfully !'
        },
        error: (response) => {
          console.error(response);
          this.successInUpdate = 'fail'
          this.updateMessage = 'Failed to update user'
          this.errorMessage = Object.values(response.error.errors)[0][0]
        console.log(this.errorMessage)
        }
      });
    }
  }

  showDeleteConfirmation(): void {
    const confirmation = window.confirm('Are you sure you want to delete your account?');
    if (confirmation) {
      this.deleteAccount();
    }
  }

  deleteAccount(): void {
    if (this.user.id) {
      this.userService.deleteUser(this.user.id).subscribe({
        next: () => {
          console.log('User deleted successfully');
          this.router.navigate(['/login-signup']);        // Navigate to login page or another page after deletion
        },
        error: (error) => {
          console.error('Failed to delete user', error);
        }
      });
    } else {
      console.error('User ID is missing');
    }
  }
}
