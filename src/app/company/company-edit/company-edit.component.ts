import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../company';
import { Observable } from 'rxjs';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  companyId: number;
  isNewCompany: boolean;
  companyForm: FormGroup;

  constructor(private companyService: CompanyService,
              private router: Router,                   // routing in the app
              private activatedRoute: ActivatedRoute,  // represent active route
              private formBuilder: FormBuilder) {       // reavtive forms

  }

  ngOnInit() {
    this.companyId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.isNewCompany = this.companyId == 0;

    this.buildForm();

    if (!this.isNewCompany) {
      this.companyService.getCompany(this.companyId)
        .subscribe(c => {
          // assign to the form
          this.companyForm.patchValue(c);  // match model and form values
        });
    }
  }

  buildForm() {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],         //  fields in form
      phone: ['0061'],
      email: ['']
    });
  }

  saveCompany() {
    if (this.isNewCompany) {
    this.companyService.addCompany(this.companyForm.value)
      .subscribe(c => this.router.navigateByUrl('/company/list'));
    } else {
      const newCompany = {...this.companyForm.value, id: this.companyId };
      this.companyService.updateCompany(newCompany)
      .subscribe(c => this.router.navigateByUrl('/company/list'));
    }
  }

}
