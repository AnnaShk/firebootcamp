import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];

  constructor() { }

  ngOnInit() {
    this.companies = this.getCompanies();
  }

  getCompanies(): Company[] {
    return [
      { name: 'Company A', phone: 123456, email: 'test@companyA.com.au' },
      { name: 'Company B', phone: 123456, email: 'test@companyB.com.au' },
      { name: 'Company C', phone: 123456, email: 'test@companyC.com.au' }
    ];
  }

}
