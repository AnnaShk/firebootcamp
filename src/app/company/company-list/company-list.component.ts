import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companies: Company[] = [];
  sub: Subscription;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.sub = this.companyService.getCompanies()
      .pipe(   // without modifing
        tap(c => console.log('component has companies ', c))  // rxjs operator
      )
      .subscribe(
        next => {
          this.companies = next; // Required. A handler for each delivered value. Called zero or more times after execution starts
          console.log('Got companies');
        },
        error => { console.error('Error'); }, // Optional. A handler for an error notification.
        () => { console.log('COMPLETE'); } // Optional. A handler for the execution-complete notification.
      );
  }

  ngOnDestroy(): void {
    if (!!this.sub) {
      this.sub.unsubscribe();
    }
  }


}
