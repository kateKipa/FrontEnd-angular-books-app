import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {Book, BookForSale, BookForSaleReadOnlyDTO, acceptableBooks } from '../shared/interfaces/book';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

const API_URL = `${environment.apiURL}/api/BooksForSale`

@Injectable({
  providedIn: 'root'
})
export class BookService {
  http: HttpClient = inject(HttpClient)
  router: Router = inject(Router)
  
  constructor(private authService: AuthService) {}

  getBooks(): Observable<BookForSaleReadOnlyDTO[]> {
    return this.http.get<BookForSaleReadOnlyDTO[]>(`${API_URL}/GetBooksForSale`, {
      headers: {
        Accept: 'application/json'
      }
  })
  }

  addANewBookForSale(bookForSaleDTO : BookForSale) {
    const headers = this.authService.getAuthorizationHeaders(); // Get headers with token
    return this.http.post<{msg: string}>(`${API_URL}/AddBookForSale/add`, bookForSaleDTO, {headers})
  }
  
  askForBuying(bookForSaleId: number, buyerId: number): Observable<any> {
    const headers = this.authService.getAuthorizationHeaders(); // Get headers with token
    const body = {bookForSaleId, buyerId}
    return this.http.post<any>(`${API_URL}/RequestPurchase`, body, {headers})
  }

}
