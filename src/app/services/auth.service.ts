import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

const API_URL = `${environment.apiURL}/api`

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}


  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getAuthorizationHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    }
    return new HttpHeaders();
  }
}