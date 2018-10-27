import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyTableComponent } from './company/company-table/company-table.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { CompanyService } from './company/company.service';
import { By } from '@angular/platform-browser';

let companySvc;

// Set
beforeEach(() => {
  companySvc = {
    getCompanies: () => of([{
      name: 'Fake Company',
      email: 'test@test.com',
      number: '1234'
    }])
  };
});

describe('Component: App Component', () => {
  // Test 1
  it('add 1+1', () => {
    expect(1 + 1).toEqual(2);
  });

  // Test 2
  it('Component Title', () => {
    const component = new AppComponent(null);
    expect(component.title).toEqual('firebootcamp-crm');
  });

  // Test 3
  it('Component with fake service', () => {
    const component = new AppComponent(companySvc);
    component.ngOnInit();
    component.companyCount$
      .subscribe(c => {
        expect(c).toEqual(1);
      });
  });

  // Test 4 (with Spy on)
  it('Component with fake serviceand spy-on', () => {
    const component = new AppComponent(companySvc);
    // SpyOn
    // overriding companySvc
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: 'Fake Company A',
        email: 'test@test.com',
        number: '1234'
      },
      {
        name: 'Fake Company B',
        email: 'test@test.com',
        number: '1234'
      }
    ]));
    component.ngOnInit();
    component.companyCount$
      .subscribe(c => {
        expect(c).toEqual(2);
      });
  });
});

describe('TestBedModule', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let companySvc: CompanyService;

  beforeEach(() => {
    // Build the component like it's running inside our application
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CompanyListComponent,   // Our routing module needs it
        CompanyTableComponent,  // Our routing module needs it
        CompanyEditComponent,   // Our routing module needs it
      ],
      imports: [
        AppRoutingModule, // Routerlink in AppComponent needs it
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    companySvc = TestBed.get(CompanyService);

  });

  it('companyCount = 1', () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([{
      name: 'Fake Company',
      email: 'test@test.com',
      number: '1234'
    }]));

    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('#companyCount')).nativeElement;
    expect(el.textComponent).toEqual('1');
    // expect(component.companyCount$.subscribe(c => {
    //   expect(c).toEqual(1);
    // }));
  });


});
