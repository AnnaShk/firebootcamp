import { AppComponent } from './app.component';
import { of } from 'rxjs';

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

describe(`Component: App Component`, () => {
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
    // Spy on
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
