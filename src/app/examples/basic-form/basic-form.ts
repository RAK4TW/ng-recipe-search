    import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './basic-form.html'
})
export class Contact {
  protected readonly contactForm = new FormGroup({
    message: new FormControl('')
  });

  protected sendMessage(): void {
    console.log('User sent:', this.contactForm.value.message);
    this.contactForm.reset();
  }
}
