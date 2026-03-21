import { Component, signal } from '@angular/core';
import { form, required, email, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  // 1. Import the FormField directive
  imports: [FormField],
  templateUrl: './signal-form.html'
})
export class Newsletter {
  protected readonly userModel = signal({ email: '' });

  // 4. Create the form signal by linking it to the model
  protected readonly signupForm = form(this.userModel, (path) => {
    // Define rules using the path object
    required(path.email);
    email(path.email);
  });
}
