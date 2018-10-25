import { Injectable } from '@angular/core';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  getCompanies(): Company[] {
    return [
      { name: 'Company A', phone: 123456, email: 'test@companyA.com.au' },
      { name: 'Company B', phone: 123456, email: 'test@companyB.com.au' },
      { name: 'Company C', phone: 123456, email: 'test@companyC.com.au' }
    ];
  }
}
