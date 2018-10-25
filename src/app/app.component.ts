import { Component } from '@angular/core';

@Component({   // metadata decorator
  selector: 'fbc-root',  // markup element to use it in future with fbc prefix
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebootcamp-crm';  // property
  constructor() {
  }

  inputChange(event) {
    console.log('input changed: ', event);
    this.title = event.target.value;
  }
}
