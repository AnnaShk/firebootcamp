import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies$: Observable<Company[]>;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companies$ = this.companyService.getCompanies()    // Creates new observable every time
      .pipe(   // without modifing
        tap(c => console.log('component has companies ', c)),  // rxjs operator
        finalize(() => console.log('COMPLETE'))
      );
  }

  deleteClicked(company: Company) {
    this.companyService.deleteCompany(company)
      .subscribe(  // Nothing (delete) will not happen without subscribe
        c => this.loadCompanies()
      );
  }
}
