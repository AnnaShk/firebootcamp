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

  deleteCompany(company: Company): Observable<Company[]> {
    console.log('DELETE 1');
    const res = this.httpClient.delete<Company[]>(`${this.API_BASE}/company/${company.id}`)
    .pipe(
      catchError(this.errorHandler)
    );
    console.log('DELETE 2');
    return res;
  }

  errorHandler(error): Observable<any> {
    console.log('Error in service', error);
    throw error;
    // if you don't want to throught the exception, you can handle the issue yourself:
    // return new Observable<Company[]>();
  }
}
