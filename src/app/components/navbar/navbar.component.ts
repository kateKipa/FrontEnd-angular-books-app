import { Component, inject } from '@angular/core';
import { MenuItem } from 'src/app/shared/interfaces/menu-item';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [RouterLink, RouterLinkActive, MatIconModule]
})
export class NavbarComponent {
  menu : MenuItem[] = [
    {text: 'Home', routerLink: 'home-page'},
    {text: 'About', routerLink: 'about-page'},
    {text: 'Contact', routerLink: 'contact'},
    {text: 'Available books', routerLink: 'available-books'},
    {text: 'Login-Signup', routerLink: 'login-signup'},
    {text: 'sell-a-book-form', routerLink: 'sell-a-book-form'},
  ]

  userService = inject(UserService);
  user = this.userService.user;

  logout() {
    this.userService.logoutUser();
  }
}
