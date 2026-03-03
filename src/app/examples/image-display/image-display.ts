import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-image-display',
  standalone: true,
  template: `
         <img [src]="imageUrl()" alt="A dynamic image" [attr.aria-hidden]="isDisabled()">
         <button [disabled]="isDisabled()">Click Me</button>
      `,
})
export class ImageDisplay {
  protected readonly imageUrl = signal('https://via.placeholder.com/150');
  protected readonly isDisabled = signal(false);
}
