//import {computedFrom} from 'aurelia-framework';
import {
  inject
} from 'aurelia-framework';

import {
  DialogService
} from 'aurelia-dialog';

@inject(DialogService)
export class Welcome {
  heading = 'Welcome to the Aurelia Navigation App';
  firstName = 'John';
  lastName = 'Doe';
  previousValue = this.fullName;

  constructor(dialogService) {

    this.dialogService = dialogService;
  }

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    this.previousValue = this.fullName;
    this.dialogService.open({
      viewModel: 'prompt',
      model: `Are you ${this.fullName} ?`
    })
    .catch((err) => {
      console.log(err);
    })
  }

  canDeactivate() {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
