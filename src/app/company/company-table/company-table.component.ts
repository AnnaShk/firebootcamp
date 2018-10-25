import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush  // 2 sample to catch changes. calls 2 timer
                                                   // not recommended to use until performance issues in complex app
})
export class CompanyTableComponent implements OnInit {
  @Input()
  companies: Company[];

  @Output()
  deleteClicked = new EventEmitter<Company>();

  constructor() { }

  ngOnInit() {
  }

  deleteCompany(company: Company) {
    this.deleteClicked.emit(company);
  }

  // 1 sample to catch changes. calls 9 times without changeDetection
  logChanges() {
    console.log('Change');
  }

}
