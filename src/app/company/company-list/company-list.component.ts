import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  companyService: CompanyService;

  constructor(companySrv: CompanyService) {
    this.companyService = companySrv;
   }

  ngOnInit() {
    this.companies = this.companyService.getCompanies();
  }


}
