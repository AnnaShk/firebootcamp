import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(private httpClient: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    const str = this.API_BASE + '/company';
    return this.httpClient.get<Company[]>(this.API_BASE + '/company') // this version not working for me: (`$(this.API_BASE)/company`)  
    .pipe(   // without modifing
      tap(c => console.log('component has companies ', c))
    );
  }
}
