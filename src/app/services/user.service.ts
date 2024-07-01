import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Credentials, JwtTokenDTO, User, UserRole } from '../shared/interfaces/user';
import { catchError } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';

const API_URL =`${environment.apiURL}/api/User`

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http: HttpClient = inject(HttpClient)
  router: Router = inject(Router)

  userId: number | null = null;
  username: string | null = null;
  email: string | null = null;
  userRole: UserRole | null = null;
  exp: number | null = null;

  user = signal<JwtTokenDTO | null>(null)          //το user ειναι signal και το καλώ σαν function

  constructor(private authService: AuthService) {
  
   const accessToken = localStorage.getItem('access_token')
    
    if (accessToken) {
        this.setUserFromToken(accessToken)

        console.log('User ID:', this.userId)
        console.log('Username:', this.username)
        console.log('Email:', this.email)
        console.log('User Role:', this.userRole)
        console.log('Time exp:', this.exp)
    }

    effect(() => {
      if (this.user()) {
        console.log('USer loggedin', this.user().username);
      } else {
        console.log('No user Logged In');
      }
    });
  }


  registerUser(userSignUpDTO: User) {
    return this.http.post<{msg: string}>(`${API_URL}/SignupUser`, userSignUpDTO)
    // .pipe(catchError(this.handleError));
  }

  loginUser(credentials: Credentials) {
    return this.http.post<{token: string}>(`${API_URL}/LoginUser`, credentials)
  }

  logoutUser() {
    this.user.set(null)
    localStorage.removeItem('access_token')
    //this.router.navigate(['login'])
    const currentRoute = this.router.routerState.snapshot.url;
    const protectedRoutes = ['my-profile', 'sell-a-book-form'];

    if (protectedRoutes.some(route => currentRoute.includes(route))) {
      this.router.navigate(['login-signup']);
  }
}

getUserData(): Observable<User> {
  const headers = this.authService.getAuthorizationHeaders(); 
  return this.http.get<User>(`${API_URL}/GetUserById`, { headers });
}

updateUserData(user: User): Observable<User> {
  const headers = this.authService.getAuthorizationHeaders(); 
  const userId = user.id
  if (userId === undefined || userId === null) {
    throw new Error("User ID is missing");
  }
  return this.http.put<User>(`${API_URL}/UpdateUserAccount/${userId}`, user, {headers});
}

deleteUser(userId: number): Observable<void> {
  const headers = this.authService.getAuthorizationHeaders();
  return this.http.delete<void>(`${API_URL}/DeleteUser/${userId}`, { headers });
}

setUserFromToken(token: string): void {
  try {
    const decodedToken = jwtDecode<JwtTokenDTO>(token);
    console.log('Decoded Token:', decodedToken);

    this.userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
    this.username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    this.email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
    this.userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    this.exp = decodedToken.exp;

    this.user.set({
      userId: this.userId,
      email: this.email,
      username: this.username,
      userRole: this.userRole,
      exp: this.exp
    });
  } catch (error) {
    console.error('Failed to decode token:', error);
  }
}
}

