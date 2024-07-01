import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Book, BookForSale, BookForSaleReadOnlyDTO, acceptableBooks } from '../shared/interfaces/book';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

const API_URL = `${environment.apiURL}/api/Sale`

@Injectable({
  providedIn: 'root'
})
export class SaleService {
    http: HttpClient = inject(HttpClient)
    router: Router = inject(Router)
  
  constructor(private authService: AuthService) {}

  getBuyingBooks(): Observable<acceptableBooks[]> {
    const headers = this.authService.getAuthorizationHeaders(); 
    return this.http.get<acceptableBooks[]>(`${API_URL}/GetBuyingBooksByUser`, { headers }
    );
  }

  getSellingBooks(): Observable<acceptableBooks[]> {
    const headers = this.authService.getAuthorizationHeaders(); 
    return this.http.get<acceptableBooks[]>(`${API_URL}/GetSellingBooksByUser`, { headers }
    );
  }

  
}