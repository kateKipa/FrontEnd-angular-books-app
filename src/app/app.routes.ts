import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { AvailableBooksComponent } from './components/available-books/available-books.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { SellABookFormComponent } from './components/sell-a-book-form/sell-a-book-form.component';
import { authGuard } from './shared/guards/auth.guard';
import { UserDataUpdateComponent } from './components/user-data-update/user-data-update.component';
import { Component } from '@angular/core';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookTableDialogComponent } from './components/book-table-dialog/book-table-dialog.component';
import { AvailableBookTableComponent } from './components/available-book-table/available-book-table.component';

export const routes: Routes = [
    {path: 'home-page', component: HomePageComponent},
    {path: 'about-page', component: AboutPageComponent},
    {path : "", redirectTo: '/home-page', pathMatch: 'full'},
    {path: 'contact', component: ContactComponent},
    {path: 'available-books', component: AvailableBooksComponent},
    {path: 'login-signup', component: LoginSignupComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'my-profile', component: MyProfileComponent, canActivate: [authGuard]},
    {path: 'sell-a-book-form', component: SellABookFormComponent, canActivate: [authGuard]},
    {path: 'user-data-update', component: UserDataUpdateComponent, canActivate: [authGuard]},
    {path: 'book-details/:id', component: BookDetailsComponent, canActivate: [authGuard]},
    {path: 'book-table-dialog', component: BookTableDialogComponent,canActivate: [authGuard]},
    {path: 'available-book-table', component: AvailableBookTableComponent,canActivate: [authGuard]},
    {path: 'available-books', component: AvailableBooksComponent}

    
];
