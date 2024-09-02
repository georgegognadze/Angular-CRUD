import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Account } from '../shared/models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) { }

  getAccount(clientId: number, accountId: number): Observable<Account> {
    const url = `${this.apiUrl}/${clientId}/${accountId}`;
    return this.http.get<Account>(url).pipe(catchError(this.handleError));
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getAccountById(id: number): Observable<Account> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Account>(url)
      .pipe(catchError(this.handleError));
  }

  addAccount(clientId: number, account: Account): Observable<Account> {
    const url = `${this.apiUrl}/${clientId}`;
    return this.http.post<Account>(url, account, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateAccount(clientId: number, accountId: number, account: Account): Observable<Account> {
    const url = `${this.apiUrl}/clients/${clientId}/accounts/${accountId}`;
    return this.http.put<Account>(url, account, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteAccount(id: number, accountId: number): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server error');
  }
}
