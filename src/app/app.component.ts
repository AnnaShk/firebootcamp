import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company/company.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({   // metadata decorator
  selector: 'fbc-root',  // markup element to use it in future with fbc prefix
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'firebootcamp-crm';  // property
  companyCount$: Observable<number>;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.companyCount$ = this.companyService.getCompanies()
      .pipe(
        map(c => c.length)
      );
  }
}
