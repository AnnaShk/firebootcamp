import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  companies$ = new BehaviorSubject<Company[]>([]); // Specific type of Observable. It's feeded values manually

  constructor(private httpClient: HttpClient) {
    this.loadCompanies();
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  deleteCompany(company: Company){
    // API deletes the company which was just deleted
    const res = this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`)
      .pipe(
        catchError(error => this.errorHandler<Company>(error))
      );
      res.subscribe (c => this.loadCompanies());
  }

  addCompany(company: Company) {
    this.httpClient.post<Company>(`${this.API_BASE}/company`,
      company,
      { headers: new HttpHeaders().set('content-type', 'application/json') })
    .pipe(catchError(e => this.errorHandler<Company>(e)))
    .subscribe (c => this.loadCompanies());
  }

  updateCompany(company: Company) {
    this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`,
      company,
      { headers: new HttpHeaders().set('content-type', 'application/json') })
    .pipe(catchError(e => this.errorHandler<Company>(e)))
    .subscribe (c => this.loadCompanies());
  }

  loadCompanies() {
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
      .pipe(
        catchError(e => this.errorHandler<Company[]>(e))
      )
      .subscribe (c => this.companies$.next(c));
  }

  getCompany(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${id}`)
    .pipe(catchError(e => this.errorHandler<Company>(e)));
  }

  errorHandler<T>(error): Observable<T> {  // <any> to handle errors from both delete and get
    // <T> using generic. Which is much better
    console.log('Error in service', error);
    throw error;
    // if you don't want to throught the exception, you can handle the issue yourself:
    // return new Observable<Company[]>();
  }
}
