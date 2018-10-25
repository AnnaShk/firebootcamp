import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(private httpClient: HttpClient) { }

  getCompanies(): Observable<Company[]> {
  return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(   // without modifing
      tap(c => console.log('service has companies ', c)),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(error): Observable<Company[]> {
    console.log('Error in service', error);
    // throw error;
    // if you don't want to throught the exception, you can handle the issue yourself:
    return new Observable<Company[]>();
  }
}
