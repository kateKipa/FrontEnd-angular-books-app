import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {Book, BookForSale, BookForSaleReadOnlyDTO, acceptableBooks } from '../shared/interfaces/book';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

const API_URL = `${environment.apiURL}/api/ApprovalSale`

@Injectable({
  providedIn: 'root'
})
export class ApprovalSaleService {
  http: HttpClient = inject(HttpClient)
  router: Router = inject(Router)
  
  constructor(private authService: AuthService) {}

  askForBuying(bookForSaleId: number, buyerId: number): Observable<any> {
    const headers = this.authService.getAuthorizationHeaders(); // Get headers with token
    const body = {bookForSaleId, buyerId}
    return this.http.post<any>(`${API_URL}/RequestPurchase`, body, {headers})
  }

  askForApprovalByUser(): Observable<any> {
    const headers = this.authService.getAuthorizationHeaders(); 
    return this.http.get<acceptableBooks[]>(`${API_URL}/GetApprovalSalesByUser`, {
      headers: {
        Accept: 'application/json'
      }
  })
  }
  
  askForApproval(): Observable<any> {
    const headers = this.authService.getAuthorizationHeaders(); 
    return this.http.get<acceptableBooks[]>(`${API_URL}/GetBooksThatNeedApproval`, {
      headers: {
        Accept: 'application/json'
      }
  })
  }

  approveSale(bookId: number): Observable<any> {
    const headers = this.authService.getAuthorizationHeaders();
    return this.http.post<any>(`${API_URL}/ApproveSale`, bookId, { headers });
  }
  
  rejectSale(bookId: number): Observable<any> {
    const headers = this.authService.getAuthorizationHeaders();
    return this.http.post<any>(`${API_URL}/RejectSale`, bookId, { headers });
  }

}