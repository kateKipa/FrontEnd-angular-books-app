import { Component, OnDestroy, OnInit, ViewChild, effect } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { Subscription } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent]
})

export class AppComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    effect(() => {
      if (!this.userService.user()) {
        this.router.navigate(['login-signup']);
      }
    });
  }

}