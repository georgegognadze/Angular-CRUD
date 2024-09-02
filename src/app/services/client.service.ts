import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Client } from '../shared/models/client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  getClients(sortField: string = 'id', sortOrder: 'asc' | 'desc' = 'asc'): Observable<Client[]> {
    const url = `${this.apiUrl}?_sort=${sortField}&_order=${sortOrder}`;
    console.log('Fetching clients from URL:', url);
    return this.http.get<Client[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  getClientById(id: number): Observable<Client> {
    const url = `${this.apiUrl}/${id}`;
    console.log('Fetching client from URL:', url);
    return this.http.get<Client>(url).pipe(
      catchError(this.handleError)
    );
  }

  updateClient(id: string, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client).pipe(
      catchError(this.handleError)
    );
  }  
  
  deleteClient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addClient(client: Client): Observable<Client> {
    return this.getHighestId().pipe(
      switchMap(highestId => {
        client.id = (highestId + 1).toString();
        return this.http.post<Client>(this.apiUrl, client).pipe(
          catchError(this.handleError)
        );
      })
    );
  }

  private getHighestId(): Observable<number> {
    return this.http.get<Client[]>(this.apiUrl).pipe(
      map(clients => {
        if (clients.length === 0) return 0;
        const highestId = clients.reduce((maxId, client) => Math.max(maxId, Number(client.id)), 0);
        return highestId;
      }),
      catchError(this.handleError)
    );
  }

  checkClientNumberExists(clientNumber: number): Observable<boolean> {
    const url = `${this.apiUrl}/clients?clientNumber=${clientNumber}`;
    return this.http.get<Client[]>(url).pipe(
      map(clients => clients.length > 0),
      catchError(() => of(false))
    );
  }

  checkAccountNumberExists(accountNumber: number): Observable<boolean> {
    const url = `${this.apiUrl}/accounts?accountNumber=${accountNumber}`;
    return this.http.get<any[]>(url).pipe(
      map(accounts => accounts.length > 0),
      catchError(() => of(false))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client-side or network error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    console.error('Error in ClientService:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
